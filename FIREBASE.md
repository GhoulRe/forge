# Saving to Firebase (use Forge from any computer)

With Firebase, your account and progress live in Google's cloud (free Spark plan, no card needed) instead of the
`data.json` file on one computer. Sign in on any computer and everything is there: plan progress, notes, snippets,
resources, streak, mock results.

**Free plan (Spark), as of 2026:** Firestore 1 GiB storage, 50,000 reads/day and 20,000 writes/day; email/password sign-in
free up to 50,000 monthly users; Hosting 10 GB storage and about 10 GB transfer a month. One person uses a tiny fraction.
Check firebase.google.com/pricing for the current numbers. Forge does not use Cloud Storage (that one needs a paid plan).

## Set up (about 10 minutes)
1. **Create a project** at https://console.firebase.google.com (Add project; Analytics is optional).
2. **Authentication** → Get started → Sign-in method → **Email/Password** → Enable.
3. **Firestore Database** → Create database → **Production mode** → pick the region closest to you (it cannot be changed later).
4. **Rules**: Firestore → Rules → paste the contents of `firestore.rules` → Publish. This lets each user read and write only their own document.
5. **Web app config**: Project settings (gear) → Your apps → Web (`</>`) → register. Copy `apiKey`, `authDomain`, `projectId`, `appId`.
6. In this folder: copy `.env.example` to `.env.local` and paste those four values. Run `npm install` (adds the Firebase SDK) and restart `npm run dev`.
   The login screen now asks for an **Email** and has **Forgot password?**. Create your account.

The web config values are not secrets (they only identify your project). The security rules are what protect your data.

> Deploying to GitHub and Netlify instead? See `DEPLOY-NETLIFY.md`.

## Use it from any computer: Firebase Hosting (free)
```bash
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting,firestore:rules --project YOUR_PROJECT_ID
```
Your site is then at `https://YOUR_PROJECT_ID.web.app`. `firebase.json` is already set up (serves `dist/`, handles page URLs on refresh).

## Zero (the AI coach) in this mode
There is no Forge server in Firebase mode, so the browser talks straight to **Ollama on the computer you are using**.
- On `http://localhost:5173` (dev) it just works.
- On your hosted site, tell Ollama to accept it, then restart Ollama. Windows (PowerShell):
  `setx OLLAMA_ORIGINS "https://YOUR_PROJECT_ID.web.app"`
- Your browser may ask permission to reach devices on your local network. Allow it. Brave may need its Shields lowered for the site.
- Each computer needs its own Ollama and model. Progress syncs; models do not. Without Ollama everything else works.
If you would rather keep Zero going through a server, leave the `VITE_FIREBASE_*` values empty and use the Forge server mode.

## Things to know
- **Last save wins.** Each save writes your whole state. If you edit on two computers at the same moment, the later save overwrites the earlier one. Close the other tab, or reload before editing.
- **Size.** Firestore documents are limited to 1 MiB. Forge trims saved console output and Zero chats automatically if you get close.
- **Moving your existing data.** In the old (server) mode: Notes & backup → Export backup. In Firebase mode, sign in, then Notes & backup → Import progress. Notes, snippets, resources, skill-tree results, scratchpads and streak history are all restored.
- **Offline.** If the network drops, Forge keeps a local copy and shows "offline"; it saves to Firebase on the next change once you are back online.
