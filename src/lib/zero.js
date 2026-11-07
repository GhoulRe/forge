import { api } from '../api.js';
import { backend } from '../backend.js';
import PROMPTS from '../../shared/zero-prompts.json';

// With the Forge server, Zero goes through it. In Firebase (browser-only) mode the browser talks to your local Ollama directly.
const env = (import.meta && import.meta.env) || {};
const OLLAMA = String(env.VITE_OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
const guard = (t, max) => t.replace(/```[\s\S]*?```/g, m => (m.split('\n').length > max ? '[Zero kept the full solution to itself. Write your attempt, then ask me to review it.]' : m));
const call = async (path, opt, ms = 90000) => { const c = new AbortController(), t = setTimeout(() => c.abort(), ms); try { return await fetch(OLLAMA + path, { ...opt, signal: c.signal }); } finally { clearTimeout(t); } };

export async function status() {
  if (backend.mode === 'server') return api('coach/status');
  try { const j = await (await call('/api/tags', {}, 2500)).json(), models = (j.models || []).map(m => m.name); return { ok: models.length > 0, models, model: models[0] || null }; }
  catch { return { ok: false, models: [] }; }
}

export async function ask(body) {
  if (backend.mode === 'server') return api('coach', body);
  const c = body.ctx || {}, kind = ['learn', 'explain', 'check', 'interview'].includes(c.kind) ? c.kind : 'learn';
  const msgs = (body.messages || []).slice(-8).map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 2000) }));
  if (!msgs.length) throw new Error('No message');
  const ctx = `Exercise: ${String(c.title || '').slice(0, 200)}\nTask: ${String(c.task || '').slice(0, 800)}\n` + (c.code ? `Learner's current code:\n${String(c.code).slice(0, 3000)}\n` : '')
    + (c.fails ? `Failing tests: ${String(c.fails).slice(0, 500)}\n` : '') + (c.errs ? `Errors: ${String(c.errs).slice(0, 300)}\n` : '') + (c.extra ? `Context:\n${String(c.extra).slice(0, 4000)}\n` : '');
  const avail = (await status()).models, model = body.model && avail.includes(body.model) ? body.model : avail[0];
  if (!model) throw new Error('Zero is offline. Start Ollama and pull a model (see README).');
  try {
    const r = await call('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ model, stream: false, keep_alive: '2m', options: { temperature: 0.3, num_ctx: 4096, num_predict: 450 }, messages: [{ role: 'system', content: PROMPTS[kind] + '\n\n' + ctx }, ...msgs] }) });
    const j = await r.json(); if (!r.ok) throw new Error(j.error || 'model error');
    const out = String((j.message && j.message.content) || '').trim();
    return { reply: kind === 'interview' ? out : guard(out, kind === 'explain' ? 16 : 8), model };
  } catch (e) { throw new Error('Zero could not answer: ' + (e.name === 'AbortError' ? 'timed out' : e.message)); }
}
