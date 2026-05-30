# Sanity Setup

The Sanity Studio is mounted at `/studio` and is the **single source of truth**
for all site content. The Next.js app only renders — every page is a GROQ
fetch with ISR.

## 1. Initialise the Sanity project (one-off, needs Simon)

```pwsh
cd D:\dev\CapabilityCentre\capability-centre-next
npx sanity@latest init --env=.env.local
```

When prompted:

- **Login:** Google → sjb247@gmail.com
- **Create new project:** Yes
- **Project name:** `capability-centre`
- **Dataset:** `production` (public)
- **Output path:** keep current directory (press enter)
- **Add config files / example schema:** **No** — we already have schemas

This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
into `.env.local`.

## 2. Generate an API token (for seeding + ISR reads)

1. Open https://www.sanity.io/manage
2. Pick the `capability-centre` project
3. **API → Tokens → Add API token**
4. Name: `nextjs-server`, Permissions: **Editor**
5. Add to `.env.local`:
   ```
   SANITY_API_TOKEN=sk-...
   ```

## 3. Add CORS origins

Same dashboard, **API → CORS Origins → Add origin**:

- `http://localhost:3000` (allow credentials: yes)
- Vercel preview/prod URLs once known

## 4. Seed the dataset

This populates Sanity with the scraped Capability Centre content — images,
site settings, home page, all 6 services, the Julie Yaxley testimonial, the
About / Book / Contact pages, and the two blog posts. **Re-runnable** — uses
`createOrReplace` with fixed IDs so it's idempotent.

```pwsh
npm run seed:sanity
```

You should see progress for images, settings, testimonials, services, home
page, simple pages, and blog posts, ending with `🎉 Seed complete.`

## 5. Verify

```pwsh
npm run dev
```

- http://localhost:3000 — site (now reading from Sanity)
- http://localhost:3000/studio — Sanity Studio for editing

In the Studio you should see:

- **Site Settings** (singleton — title, contact email, hours, nav, etc.)
- **Home Page** (singleton — hero slides, services section, pillars, testimonials, CTA)
- **Pages** (About, Book a Call, Contact)
- **Services** (6 — Leadership & Strategy through Sales & Negotiation)
- **Testimonials** (Julie Yaxley)
- **Blog Posts** (Unlocking Potential Energy, Thank You is a Competitive Advantage)

Edit any field, save, refresh the live page after ~60 seconds (ISR) — or
configure the webhook for instant revalidation.

## 6. Webhook for instant revalidation (optional, recommended for prod)

Sanity dashboard → **API → Webhooks → Add webhook**:

- **Name:** Next.js revalidate
- **URL:** `https://<your-domain>/api/revalidate?secret=<value-of-SANITY_REVALIDATE_SECRET>`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **HTTP method:** POST
- **API version:** `v2024-10-01`
- **Projection:**
  ```groq
  {
    "_type": _type,
    "slug": slug.current
  }
  ```
- Add `SANITY_REVALIDATE_SECRET` to `.env.local` + Vercel env vars with the same value.

Now publishing in the Studio instantly purges the matching ISR routes — no
60-second wait.

## Schemas overview

- **siteSettings** (singleton) — title, tagline, description, logo, contact
  email, phone, address, office hours, social links, navigation, CTA
- **homePage** (singleton) — SEO, hero slides, services section, pillars, testimonials, CTA
- **page** — generic pages with hero + portable text body + optional sidebar
  (About, Book a Call, Contact use this)
- **service** — title, slug, short + long description, image, body, outcomes
- **testimonial** — quote, author, role, company, photo
- **blogPost** — title, slug, excerpt, cover image, author, publishedAt, tags,
  portable text body, SEO
