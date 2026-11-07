import { useEffect, useState } from 'react';
import { backend } from './backend.js';
import { Provider } from './store.jsx';
import Auth from './components/Auth.jsx';
import Shell from './components/Shell.jsx';

export default function App() {
  const [s, setS] = useState({ loading: true });
  useEffect(() => { backend.me().then(j => setS({ user: j.user, init: j.state })).catch(() => setS({})); }, []);
  if (s.loading) return <div className="boot">Loading…</div>;
  if (!s.user) return <Auth onIn={j => setS({ user: j.user, init: j.state })} />;
  return <Provider key={s.user} user={s.user} init={s.init}><Shell onOut={() => setS({})} /></Provider>;
}
