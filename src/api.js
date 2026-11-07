export async function api(path, body, method) {
  const r = await fetch('/api/' + path, {
    method: method || (body ? 'POST' : 'GET'),
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!(r.headers.get('content-type') || '').includes('json')) // e.g. a static host that returns index.html for /api/*
    throw Object.assign(new Error('Cannot reach the Forge server here. On static hosting such as Netlify, switch on Firebase mode (see FIREBASE.md).'), { status: r.status || 0 });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(j.error || 'Request failed'), { status: r.status });
  return j;
}
