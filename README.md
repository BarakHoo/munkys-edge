# munkys-edge

The **edge / infrastructure** layer for [munkys.dev](https://munkys.dev). This repo
owns the domain — TLS, reverse-proxy routing, and the personal portfolio site.

It is deliberately **decoupled from every application**. FYURI and the static
side-projects each run as their own containers and simply join a shared Docker
network. That means any app can be built, restarted, handed off, or hosted
elsewhere without affecting the domain or the other projects.

## What lives here

| Path | Purpose |
|------|---------|
| `Caddyfile` | All routing for munkys.dev (root portfolio + `/fyuri` + side-project subpaths) with automatic HTTPS |
| `portfolio/` | The personal intro/portfolio site (served statically at `/`) |
| `docker-compose.yml` | Caddy + the static side-project containers, on the shared `web` network |

## Architecture

```
					   Internet
						  │
				  ┌───────▼────────┐
				  │  Caddy (edge)  │   ← this repo, owns TLS + routing
				  └───────┬────────┘
		┌─────────────────┼──────────────────────────┐
		│ /               │ /fyuri                    │ /calc3d, /face, ...
		▼                 ▼                           ▼
   portfolio       fyuri-frontend (FYURI stack)   project nginx containers
						  │
				   backend + mysql (FYURI-internal network)
```

All app containers attach to an **external** Docker network named `web`.
No single stack owns it, so nothing is coupled to FYURI.

## Deploy (server)

One-time:

```bash
docker network create web
```

Expected sibling layout:

```
~/apps/munkys-edge               (this repo)
~/apps/FYURI
~/apps/calc3d-print-calculator
~/apps/face-detection
~/apps/location-reminders
~/apps/shopping-list
~/apps/face-mesh-explorer
```

Bring up (apps first, edge last):

```bash
cd ~/apps/FYURI        && docker compose up -d --build
cd ~/apps/munkys-edge  && docker compose up -d --build
```

## Adding a new project

1. Give the project its own repo with a `Dockerfile` + `nginx.conf`.
2. Clone it as a sibling folder on the server.
3. Add a service (build context `../<repo>`) to `docker-compose.yml`.
4. Add a `handle_path /<slug>/*` block to the `Caddyfile`.
5. Add a card to `portfolio/index.html`.
6. `docker compose up -d --build`.

## Note on FYURI being hosted twice

FYURI runs here under `munkys.dev/fyuri` as a showcase. The business owner hosts
the **same app** on their own domain at root `/`. Because the edge lives in THIS
repo (not in FYURI), the owner's deployment carries none of this portfolio or
routing — they just run the FYURI stack with its base path set to `/`.
