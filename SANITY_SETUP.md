# Sanity Setup

The Sanity Studio is mounted at `/studio`. To finish setup, run these commands
locally **as Simon** (sjb247@gmail.com) — Sanity init requires browser auth.

## 1. Initialise a Sanity project

From the project root:

```pwsh
cd D:\dev\CapabilityCentre\capability-centre-next
npx sanity@latest init --env=.env.local
```

When prompted:

- **Login:** Google → sjb247@gmail.com
- **Create new project:** Yes
- **Project name:** `capability-centre`
- **Dataset:** `production` (public)
- **Output path:** keep current directory (just press enter)
- **Add config files / example schema:** No (we already have schemas)

This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
into `.env.local` automatically.

## 2. Generate an API token

1. Go to https://www.sanity.io/manage
2. Open the `capability-centre` project
3. **API → Tokens → Add API token**
4. Name: `nextjs-server`, Permissions: **Editor**
5. Copy the token into `.env.local` as `SANITY_API_TOKEN=<token>`

## 3. Add a CORS origin

In the same Sanity project dashboard:

- **API → CORS Origins → Add origin**
- Add `http://localhost:3000` (allow credentials: yes)
- Add the Vercel preview/prod URLs later when known

## 4. Verify

```pwsh
npm run dev
```

Visit:

- http://localhost:3000 — site
- http://localhost:3000/studio — Sanity Studio

You should be able to log in to the studio and create a `Site Settings`
document.

## Schemas already created

- `siteSettings` — title, logo, contact info, navigation
- `page` — generic pages with hero + portable text body
- `service` — service detail pages
- `testimonial` — quotes with author + photo
- `blogPost` — articles with cover image, categories, body
