'use strict';
// Forge server — zero dependencies. Run: node server.js  (Node 18+)
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = process.env.PORT || 3000;
const DB_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const PUB = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(PUB)) console.log('No dist/ yet. Run `npm run build` for production, or `npm run dev` for development.');
const DAY30 = 30 * 24 * 3600 * 1000;
let db = { users: {}, sessions: {} };
try { db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch (e) {}
let dirty = false;
const flush = () => { if (!dirty) return; dirty = false; const t = DB_FILE + '.tmp'; fs.writeFileSync(t, JSON.stringify(db)); fs.renameSync(t, DB_FILE); };
setInterval(flush, 1000).unref();
['exit', 'SIGINT', 'SIGTERM'].forEach(s => process.on(s, () => { flush(); if (s !== 'exit') process.exit(); }));
const touch = () => { dirty = true; };

const send = (res, code, obj, hdr = {}) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...hdr }); res.end(JSON.stringify(obj)); };
const body = req => new Promise((ok, no) => {
  let n = 0, b = [];
  req.on('data', c => { n += c.length; if (n > 1e6) { no(Object.assign(new Error('Too large'), { code: 413 })); req.destroy(); } else b.push(c); });
  req.on('end', () => { try { ok(JSON.parse(Buffer.concat(b).toString() || '{}')); } catch (e) { no(Object.assign(new Error('Bad JSON'), { code: 400 })); } });
});
const cookie = req => Object.fromEntries((req.headers.cookie || '').split(';').map(c => c.trim().split('=')).filter(p => p[0]));
const hash = (pw, salt) => crypto.scryptSync(pw, salt, 64);
const fails = {}; // simple brute-force throttle: 8 failures / 10 min per user+ip
function throttled(k) { const f = (fails[k] || []).filter(t => Date.now() - t < 6e5); fails[k] = f; return f.length >= 8; }

function session(req) {
  const s = db.sessions[cookie(req).sid];
  if (!s) return null;
  if (s.exp < Date.now()) { delete db.sessions[cookie(req).sid]; touch(); return null; }
  return s;
}
function login(req, res, name) {
  const sid = crypto.randomBytes(24).toString('hex');
  db.sessions[sid] = { user: name, exp: Date.now() + DAY30 }; touch();
  const secure = req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : '';
  send(res, 200, { user: name, state: db.users[name].state || {} },
    { 'Set-Cookie': `sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${DAY30 / 1000}${secure}` });
}


// ---- Zero: a Socratic coach backed by a LOCAL model (Ollama). Nothing leaves your machine. ----
const OLLAMA = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/$/, ''), MODEL = process.env.OLLAMA_MODEL || '';
const timeoutFetch = (url, opt = {}, ms = 90000) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); return fetch(url, { ...opt, signal: c.signal }).finally(() => clearTimeout(t)); };
async function localModels() { const r = await timeoutFetch(OLLAMA + '/api/tags', {}, 2000); const j = await r.json(); return (j.models || []).map(m => m.name); }
const PROMPTS = require('../shared/zero-prompts.json'); // shared with browser-only (Firebase) mode

const calls = {};
const coachLimited = u => { const a = (calls[u] = (calls[u] || []).filter(t => Date.now() - t < 60000)); if (a.length >= 20) return true; a.push(Date.now()); return false; };
const KEEP = process.env.FORGE_KEEP_ALIVE || '2m', NUM_CTX = +process.env.OLLAMA_NUM_CTX || 4096; // light by default: unload after 2 min idle, modest context
const guard = (t, max = 8) => t.replace(/```[\s\S]*?```/g, m => (m.split('\n').length > max ? '[Zero kept the full solution to itself. Write your attempt, then ask me to review it.]' : m));

async function api(req, res, route) {
  const ct = req.headers['content-type'] || '';
  if (req.method !== 'GET' && !ct.includes('application/json')) return send(res, 415, { error: 'JSON only' });
  if (route === 'me' && req.method === 'GET') {
    const s = session(req); if (!s) return send(res, 401, { error: 'Not signed in' });
    return send(res, 200, { user: s.user, state: db.users[s.user].state || {} });
  }
  if (route === 'signup' || route === 'login') {
    const b = await body(req), name = String(b.username || '').toLowerCase(), pw = String(b.password || '');
    const key = name + '|' + req.socket.remoteAddress;
    if (throttled(key)) return send(res, 429, { error: 'Too many attempts. Try again in a few minutes.' });
    if (route === 'signup') {
      if (process.env.ALLOW_SIGNUP === 'false') return send(res, 403, { error: 'Sign-ups are closed on this server.' });
      if (!/^[a-z0-9_]{3,20}$/.test(name)) return send(res, 400, { error: 'Username: 3-20 letters, numbers or _' });
      if (pw.length < 8) return send(res, 400, { error: 'Password must be at least 8 characters' });
      if (db.users[name]) return send(res, 409, { error: 'That username is taken' });
      const salt = crypto.randomBytes(16).toString('hex');
      db.users[name] = { salt, hash: hash(pw, salt).toString('hex'), state: {}, created: Date.now() };
      touch(); return login(req, res, name);
    }
    const u = db.users[name];
    if (!u || !crypto.timingSafeEqual(hash(pw, u.salt), Buffer.from(u.hash, 'hex'))) {
      (fails[key] = fails[key] || []).push(Date.now());
      return send(res, 401, { error: 'Wrong username or password' });
    }
    return login(req, res, name);
  }
  if (route === 'logout' && req.method === 'POST') {
    delete db.sessions[cookie(req).sid]; touch();
    return send(res, 200, { ok: 1 }, { 'Set-Cookie': 'sid=; HttpOnly; Path=/; Max-Age=0' });
  }
  if (route === 'state' && req.method === 'PUT') {
    const s = session(req); if (!s) return send(res, 401, { error: 'Not signed in' });
    const b = await body(req);
    if (!b.state || typeof b.state !== 'object' || Array.isArray(b.state)) return send(res, 400, { error: 'Bad state' });
    db.users[s.user].state = b.state; touch();
    return send(res, 200, { ok: 1, ts: b.state.ts });
  }

  if (route === 'coach/status' && req.method === 'GET') {
    if (!session(req)) return send(res, 401, { error: 'Not signed in' });
    try { const m = await localModels(); return send(res, 200, { ok: m.length > 0, models: m, model: MODEL || m[0] || null }); }
    catch (e) { return send(res, 200, { ok: false, models: [] }); }
  }
  if (route === 'coach' && req.method === 'POST') {
    const s = session(req); if (!s) return send(res, 401, { error: 'Not signed in' });
    if (coachLimited(s.user)) return send(res, 429, { error: 'Slow down a little. Zero is thinking.' });
    const b = await body(req), c = b.ctx || {}, kind = ['learn', 'explain', 'check', 'interview'].includes(c.kind) ? c.kind : 'learn';
    const msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-8).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 2000) }));
    if (!msgs.length) return send(res, 400, { error: 'No message' });
    const ctx = `Exercise: ${String(c.title || '').slice(0, 200)}\nTask: ${String(c.task || '').slice(0, 800)}\n` + (c.code ? `Learner's current code:\n${String(c.code).slice(0, 3000)}\n` : '') + (c.fails ? `Failing tests: ${String(c.fails).slice(0, 500)}\n` : '') + (c.errs ? `Errors: ${String(c.errs).slice(0, 300)}\n` : '') + (c.extra ? `Context:\n${String(c.extra).slice(0, 4000)}\n` : '');
    let model = MODEL, avail = []; try { avail = await localModels(); } catch (e) { /* offline */ }
    if (b.model && avail.includes(b.model)) model = b.model; else if (!model) model = avail[0];
    if (!model) return send(res, 503, { error: 'Zero is offline. Start Ollama and pull a model (see README).' });
    try {
      const r = await timeoutFetch(OLLAMA + '/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model, stream: false, keep_alive: KEEP, options: { temperature: 0.3, num_ctx: NUM_CTX, num_predict: 450 }, messages: [{ role: 'system', content: PROMPTS[kind] + '\n\n' + ctx }, ...msgs] }) });
      const j = await r.json(); if (!r.ok) throw new Error(j.error || 'model error');
      const out = String((j.message && j.message.content) || '').trim();
      return send(res, 200, { reply: kind === 'interview' ? out : guard(out, kind === 'explain' ? 16 : 8), model });
    } catch (e) { return send(res, 503, { error: 'Zero could not answer: ' + (e.name === 'AbortError' ? 'timed out' : e.message) }); }
  }
  send(res, 404, { error: 'Not found' });
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff'); res.setHeader('X-Frame-Options', 'DENY'); res.setHeader('Referrer-Policy', 'same-origin');
  try {
    const url = new URL(req.url, 'http://x');
    if (url.pathname === '/healthz') return send(res, 200, { ok: 1 });
    if (url.pathname.startsWith('/api/')) return await api(req, res, url.pathname.slice(5));
    const file = path.normalize(path.join(PUB, url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname)));
    if (!file.startsWith(PUB + path.sep)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (err, data) => {
      if (err) { // unknown path without a file extension = a client-side route, so serve the app
        if (!path.extname(file)) return fs.readFile(path.join(PUB, 'index.html'), (e2, html) => { if (e2) { res.writeHead(404); return res.end('Not found'); } res.writeHead(200, { 'Content-Type': TYPES['.html'] }); res.end(html); });
        res.writeHead(404); return res.end('Not found');
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }); res.end(data);
    });
  } catch (e) { send(res, e.code || 500, { error: e.code ? e.message : 'Server error' }); }
}).listen(PORT, () => console.log(`Forge running → http://localhost:${PORT}`));
