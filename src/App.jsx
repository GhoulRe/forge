import { useEffect, useState } from 'react';
import { backend } from './backend.js';
import { Provider } from './store.jsx';
import Auth from './components/Auth.jsx';
import Shell from './components/Shell.jsx';

export default function App() {
  const [s, setS] = useState({ loading: true, user: null, init: null, showAuthModal: false });

  useEffect(() => {
    backend.me()
      .then(j => setS({ loading: false, user: j.user, init: j.state, showAuthModal: false }))
      .catch(() => {
        const guestRaw = localStorage.getItem('forjix.guest') || localStorage.getItem('forge.guest');
        if (guestRaw) {
          try {
            setS({ loading: false, user: 'guest', init: JSON.parse(guestRaw), showAuthModal: false });
            return;
          } catch {
            /* ignore */
          }
        }
        setS({ loading: false, user: null, init: null, showAuthModal: false });
      });
  }, []);

  if (s.loading) return <div className="boot">Loading Forjix…</div>;

  if (!s.user) {
    return <Auth onIn={j => setS({ loading: false, user: j.user, init: j.state, showAuthModal: false })} />;
  }

  return (
    <Provider
      key={s.user}
      user={s.user}
      init={s.init}
      onSyncAccount={() => setS(prev => ({ ...prev, showAuthModal: true }))}
    >
      <Shell
        onOut={() => setS({ loading: false, user: null, init: null, showAuthModal: false })}
        onShowAuth={() => setS(prev => ({ ...prev, showAuthModal: true }))}
      />
      {s.showAuthModal && (
        <Auth
          onIn={j => setS({ loading: false, user: j.user, init: j.state, showAuthModal: false })}
          onCancel={() => setS(prev => ({ ...prev, showAuthModal: false }))}
        />
      )}
    </Provider>
  );
}
