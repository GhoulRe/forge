# Deploying Forge

Forge is a small Node server that serves the built React app and stores accounts and progress in ONE JSON file.
So you need a host with (1) a long-running Node process, (2) a persistent disk, (3) HTTPS.

## Not suitable
Vercel, Netlify, GitHub Pages, and free tiers with an ephemeral disk (for example Render free): the file is wiped on
restart, so every account and all progress would be lost.

## Environment variables
| Variable | Meaning |
|---|---|
| `PORT` | port to listen on (default 3000) |
| `DATA_FILE` | where accounts and progress are saved. Point it at a persistent volume, e.g. `/data/data.json` |
| `ALLOW_SIGNUP` | set to `false` after you create your account so nobody else can |
| `OLLAMA_URL`, `OLLAMA_MODEL` | optional: where Zero's local model lives. Not available on most hosts (see below) |

## Option A: any VPS with Docker (most control)
```bash
git clone <your repo> forge && cd forge
docker build -t forge .
docker run -d --name forge --restart unless-stopped \
  -p 127.0.0.1:3000:3000 -v forge-data:/data \
  -e ALLOW_SIGNUP=true forge
# open the site, create your account, then:
docker rm -f forge && docker run -d --name forge --restart unless-stopped \
  -p 127.0.0.1:3000:3000 -v forge-data:/data -e ALLOW_SIGNUP=false forge
```
Add HTTPS with Caddy (it gets certificates automatically). `/etc/caddy/Caddyfile`:
```
forge.example.com {
  reverse_proxy 127.0.0.1:3000
}
```
Point your domain's DNS A record at the server first.

## Option B: Fly.io (managed, with a volume)
```bash
fly launch --no-deploy            # detects the Dockerfile; pick a name and region
fly volumes create forge_data --size 1
```
Add to `fly.toml`:
```toml
[env]
  PORT = "3000"
  DATA_FILE = "/data/data.json"
[mounts]
  source = "forge_data"
  destination = "/data"
[http_service]
  internal_port = 3000
  force_https = true
```
```bash
fly scale count 1                 # a volume attaches to a single machine
fly deploy
```

## Option C: Railway or Render (with a disk/volume)
Create a Web Service from your repo (it will use the Dockerfile), attach a persistent volume mounted at `/data`,
and set `DATA_FILE=/data/data.json`. Render needs a paid plan for persistent disks.

## Without Docker
```bash
npm install && npm run build
PORT=3000 DATA_FILE=/var/lib/forge/data.json node server/index.cjs   # run under pm2 or systemd
```
Put Caddy or nginx in front for HTTPS (the session cookie is marked Secure when the proxy sends `X-Forwarded-Proto: https`).

## Backups
Everything lives in `DATA_FILE`. Copy it regularly (for example a nightly cron `cp`), and use Export backup inside the app too.

## About Zero (the AI coach) once deployed
Zero talks to Ollama on the machine running the server. On a normal cloud host there is no model, so Zero shows "offline"
and the hint ladder is used instead. To keep it: run Forge on your own computer, or run Ollama on a server with enough RAM/GPU
and set `OLLAMA_URL`. Everything else works anywhere.

## Health check
`GET /healthz` returns `{"ok":1}` (used by the Docker HEALTHCHECK and most platforms).
