import { api } from './api.js';

// Where accounts and progress live. Default: the Forge server (data.json). With VITE_FIREBASE_* set: Firebase.
const env = (import.meta && import.meta.env) || {};
const cfg = { apiKey: env.VITE_FIREBASE_API_KEY, authDomain: env.VITE_FIREBASE_AUTH_DOMAIN, projectId: env.VITE_FIREBASE_PROJECT_ID, appId: env.VITE_FIREBASE_APP_ID };

const server = {
  mode: 'server', saveDelay: 600, idLabel: 'Username', pwHint: '8+ characters',
  me: () => api('me'),                                                  // -> { user, state }
  login: (id, pw) => api('login', { username: id, password: pw }),
  signup: (id, pw) => api('signup', { username: id, password: pw }),
  logout: () => api('logout', {}),
  save: state => api('state', { state }, 'PUT'),
  reset: async () => { throw new Error('Password reset needs Firebase mode.'); },
};

// ---- Firebase: Auth (email + password) and one Firestore document per user: users/{uid} ----
let fb;
async function sdk() {
  if (fb) return fb;
  const [app, A, S] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]);
  const a = app.initializeApp(cfg);
  return (fb = { auth: A.getAuth(a), db: S.getFirestore(a), A, S });
}
const MSG = {
  'auth/invalid-credential': 'Wrong email or password', 'auth/wrong-password': 'Wrong email or password', 'auth/user-not-found': 'Wrong email or password',
  'auth/email-already-in-use': 'That email already has an account. Try logging in.', 'auth/weak-password': 'Password must be at least 6 characters',
  'auth/invalid-email': 'Enter a valid email address', 'auth/too-many-requests': 'Too many attempts. Try again in a few minutes.',
  'auth/network-request-failed': 'Network error. Check your internet connection.', 'auth/operation-not-allowed': 'Email/password sign-in is not enabled in your Firebase project yet.',
};
const wrap = async f => {
  try { return await f(); } catch (e) {
    if (e.status) throw e;
    throw Object.assign(new Error(MSG[e.code] || e.message || 'Something went wrong'), { status: /unauthenticated|permission-denied/.test(e.code || '') ? 401 : 0 });
  }
};
const load = async u => {
  const { db, S } = await sdk(), snap = await S.getDoc(S.doc(db, 'users', u.uid)), d = snap.exists() ? snap.data() : null;
  return { user: u.email, state: d && d.json ? JSON.parse(d.json) : {} };
};
const firebase = {
  mode: 'firebase', saveDelay: 1500, idLabel: 'Email', pwHint: '6+ characters',
  me: () => wrap(async () => {
    const { auth, A } = await sdk();
    const u = await new Promise(res => { const off = A.onAuthStateChanged(auth, x => { off(); res(x); }); });
    if (!u) throw Object.assign(new Error('Not signed in'), { status: 401 });
    return load(u);
  }),
  login: (id, pw) => wrap(async () => { const { auth, A } = await sdk(); return load((await A.signInWithEmailAndPassword(auth, id.trim(), pw)).user); }),
  signup: (id, pw) => wrap(async () => { const { auth, A } = await sdk(); return load((await A.createUserWithEmailAndPassword(auth, id.trim(), pw)).user); }),
  logout: () => wrap(async () => { const { auth, A } = await sdk(); await A.signOut(auth); }),
  reset: id => wrap(async () => { const { auth, A } = await sdk(); await A.sendPasswordResetEmail(auth, id.trim()); }),
  save: state => wrap(async () => {
    const { auth, db, S } = await sdk(), u = auth.currentUser;
    if (!u) throw Object.assign(new Error('Signed out'), { status: 401 });
    let json = JSON.stringify(state);
    if (json.length > 900000) json = JSON.stringify({ ...state, out: {}, chat: {} }); // Firestore documents are limited to 1 MiB
    await S.setDoc(S.doc(db, 'users', u.uid), { json, ts: state.ts || Date.now() });
  }),
};

export const backend = cfg.apiKey && cfg.projectId ? firebase : server;
