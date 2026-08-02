# Quartiere — Backend API

Bun + Express 5 + Prisma 7 (PostgreSQL) REST API for the Fair Deal Property real-estate site.

## Prerequisites

- [Bun](https://bun.com) >= 1.3
- [Docker](https://www.docker.com) (for the local Postgres database)

## Setup

```bash
bun install
cp .env.example .env   # then fill in values
bun run db:up          # start Postgres on port 5433
bunx prisma migrate dev
bunx prisma db seed
bun run dev            # http://localhost:3001
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `PORT` | No | Port (default `3001`) |
| `ADMIN_PASSWORD` | Yes* | Admin panel password. *No default — set one. |
| `ADMIN_SECRET` | Yes* | Secret used to sign admin tokens. *No default — set one. |
| `R2_ACCOUNT_ID` | No | Cloudflare R2 (free tier) — image uploads |
| `R2_ACCESS_KEY_ID` | No | R2 API token |
| `R2_SECRET_ACCESS_KEY` | No | R2 API secret |
| `R2_BUCKET_NAME` | No | R2 bucket name |
| `R2_PUBLIC_URL` | No | Public bucket URL (e.g. `https://pub-xxx.r2.dev`) |
| `CF_IMAGES_ACCOUNT_ID` | No | Reserved for Cloudflare Images |
| `CF_IMAGES_API_TOKEN` | No | Reserved for Cloudflare Images |

If R2 is not configured, uploaded images are saved to `backend/uploads/` and served from `/uploads` (free local storage — note: files are lost on redeploy of an ephemeral host).

## API

### Public

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | List properties. Query: `type` (`sale`/`rent`), `q` (search), `limit` (default 12, max 50), `offset` |
| GET | `/api/properties/:idOrSlug` | Single property by id or slug |
| GET | `/api/features` | List features |
| POST | `/api/inquiries` | Create an inquiry (`kind`: `CONTACT` / `SELL` / `AGENT`) |

### Admin (Bearer token from `/api/admin/login`)

| Method | Path | Description |
|---|---|---|
| POST | `/api/admin/login` | `{ password }` → `{ data: { token } }` (24h TTL) |
| GET | `/api/admin/inquiries` | List inquiries. Query: `kind`, `limit` (max 100), `offset` |
| GET | `/api/admin/inquiries/:id` | Single inquiry |
| DELETE | `/api/admin/inquiries/:id` | Delete inquiry |
| POST | `/api/admin/upload` | Multipart `file` upload → `{ data: { url, key } }` (jpg/png/webp/gif/avif, max 10 MB) |
| POST | `/api/admin/properties` | Create property |
| PUT | `/api/admin/properties/:id` | Update property |
| DELETE | `/api/admin/properties/:id` | Delete property |

## Scripts

```bash
bun run dev          # start dev server (watch mode)
bun run typecheck    # tsc --noEmit
bun run db:up        # start Postgres (docker compose)
bun run db:down      # stop Postgres
bun run db:migrate   # prisma migrate dev
bun run db:seed      # prisma db seed
bun run db:studio    # prisma studio
```
