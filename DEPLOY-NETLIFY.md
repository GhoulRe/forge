# GitHub, then Netlify, then Firebase

## Read this first: Netlify needs Firebase
Netlify serves **static files only**. It cannot run the Forge server or keep `data.json`. So the Netlify copy of Forge must use
**Firebase mode** for accounts and progress. If you deploy before Firebase is configured, the site loads but the login screen
shows "No Forge server found here". That is expected, and it is fixed by adding the Firebase variables and redeploying.

**Easiest order** (about 25 minutes): do Firebase steps 1 to 5 in `FIREBASE.md` first, then GitHub, then Netlify with the variables.
If you prefer GitHub and Netlify first, that is fine too: just redeploy after step 3 below.

---
## 1. Put the project on GitHub (Windows PowerShell)
1. Check Git is installed: `git --version`. If not, install it from https://git-scm.com/download/win (accept the defaults) and open a new PowerShell.
2. On https://github.com/new create a repository named `forge`. Private is fine. Do **not** tick "Add a README".
3. In PowerShell, go to your project folder and run:
```powershell
cd path\to\forge-react
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git init
git add .
git status
```
4. **Look at the `git status` list before continuing.** It must NOT show `server/data.json` (that file holds accounts), `node_modules`, `dist` or `.env.local`.
   They are already in `.gitignore`, so they should be absent. Then:
```powershell
git commit -m "Forge: first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/forge.git
git push -u origin main
```
A browser window opens to sign in to GitHub the first time. If you prefer clicking to typing, **GitHub Desktop** (desktop.github.com) does the same: Add local repository, Publish.

## 2. Create the site on Netlify
1. https://app.netlify.com, sign up with GitHub. **Add new project, Import an existing project, GitHub**, choose `forge`.
2. The build settings fill in from `netlify.toml` (build command `npm run build`, publish folder `dist`). Leave them.
3. **Before you press Deploy**, open **Environment variables** and add these four (values from your Firebase web app config; names must match exactly):
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
4. Deploy. When it finishes you get `https://something.netlify.app` (you can rename it under Site configuration, Site details).

**Already deployed without the variables?** Add them under Site configuration, Environment variables, then Deploys, **Trigger deploy, Clear cache and deploy site**.
The values are baked into the build, so a redeploy is required after any change.

## 3. Tell Firebase about your new address
Firebase console, Authentication, Settings, **Authorized domains**, Add domain: `something.netlify.app` (and your custom domain if you add one).
This is needed for Google/GitHub sign-in and some email links, and is harmless for plain email and password.
Also make sure you did Firebase steps 2 to 4 in `FIREBASE.md` (enable Email/Password, create Firestore, publish `firestore.rules`).

## 4. Zero (the AI coach) on the Netlify site
Your browser talks to Ollama on the computer you are using. On Windows (PowerShell), allow the site, then quit and reopen Ollama:
```powershell
setx OLLAMA_ORIGINS "https://something.netlify.app"
```
The browser may ask permission to reach your local network: allow it. Everything else works without Ollama.

## 5. Updating the site later
```powershell
git add .
git commit -m "What I changed"
git push
```
Netlify rebuilds and publishes automatically.

## Free plan: watch the credits
As of mid 2026 Netlify's free plan gives **300 credits a month**; a production deploy costs about **15 credits** and bandwidth about **20 credits per GB**
(sources vary slightly, so check the Netlify pricing page). That is roughly 20 deploys a month. If you run out, the site is paused until the next month.
- Batch your changes into fewer pushes. Deploys of other branches and pull requests (deploy previews) are free: try things on a branch, merge once.
- Forge is small, so bandwidth is not a concern for one user.
- **Alternative:** Firebase Hosting (see `FIREBASE.md`) has no credit system, and you already use Firebase.

## If something goes wrong
| What you see | Fix |
|---|---|
| Build fails with "Cannot find module 'firebase'" | Make sure `package.json` (with `firebase` listed) was committed and pushed |
| Site loads, login says "No Forge server found here" | The four `VITE_FIREBASE_*` variables are missing or misspelled. Fix them, then clear cache and redeploy |
| Refreshing on `/plan/1` shows "Page not found" | `netlify.toml` was not committed (it holds the redirect rule) |
| "Email/password sign-in is not enabled" | Firebase, Authentication, Sign-in method, enable Email/Password |
| Signs in but progress does not save ("permission-denied") | Publish `firestore.rules` in Firebase, Firestore, Rules |
| Zero says offline | Ollama not running, or `OLLAMA_ORIGINS` not set to your Netlify address and Ollama not restarted |
