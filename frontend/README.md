# Fair Deal Property — Frontend

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4 frontend for the Fair Deal Property real-estate site.

## Prerequisites

- Node.js >= 20
- The backend API running (see `backend/README.md`)

## Setup

```bash
npm install
cp .env.example .env.local   # if it doesn't exist
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | No | Backend API base URL (default `http://localhost:3001/api`) |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL for sitemap/robots (default `http://localhost:3000`) |

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, features, featured sale properties |
| `/for-sale` | Sale listings with search |
| `/for-rent` | Rent listings |
| `/property/[id]` | Property detail (by id or slug) |
| `/contact` | Contact form (CONTACT inquiry) |
| `/sell-property` | Sell pitch + form (SELL inquiry) |
| `/admin` | Admin dashboard (inquiries + property CRUD + image uploads) |
| `/admin/login` | Admin login (password) |

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint
```

The admin panel is at `/admin`. Set `ADMIN_PASSWORD` in the backend's `.env` (see backend README).

Image uploads use Cloudflare R2 (free tier) through `POST /api/admin/upload`; if R2 isn't configured the backend stores files locally. Images served from the API host (e.g. `http://localhost:3001`) must be allowed in `next.config.ts` → `images.remotePatterns`.
