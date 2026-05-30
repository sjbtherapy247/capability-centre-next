# Capability Centre

Next.js 14+ App Router rebuild of [capabilitycentre.com.au](https://capabilitycentre.com.au) —
Louise Manning's executive coaching, leadership and business consulting practice.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config in `app/globals.css`)
- **CMS:** Sanity (Studio mounted at `/studio`)
- **Auth + DB:** Supabase
- **Email:** Resend
- **Booking:** Cal.com (embed)
- **Hosting:** Vercel

## Brand palette

- Teal: `#0d9488` (`brand-teal`)
- Navy: `#1e293b` (`brand-navy`)
- Gold: `#ca8a04` (`brand-gold`)
- Cream: `#fefce8` (`brand-cream`)

Available as Tailwind utilities: `bg-brand-teal`, `text-brand-navy`, etc.

## Getting started

```pwsh
npm install
cp .env.example .env.local   # then fill in values
npm run dev
```

Open http://localhost:3000

## Setup checklist

- [ ] Run `npx sanity@latest init` — see [SANITY_SETUP.md](./SANITY_SETUP.md)
- [ ] Create Vercel project — see [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- [ ] Get Resend API key
- [ ] Create Supabase project (if needed for auth / form storage)
- [ ] Configure Cal.com event type for `/book-a-call`

## Project structure

```
app/
  layout.tsx        Root layout with Header + Footer
  page.tsx          Home
  about/            About page
  services/         Services index + dynamic [slug]
  blog/             Blog index (Sanity-driven)
  book-a-call/      Cal.com embed
  contact/          Contact form
  studio/           Sanity Studio (catch-all)
components/
  Header.tsx
  Footer.tsx
lib/
  sanity.ts         Sanity client + image URL builder
  supabase.ts       Supabase client
  resend.ts         Resend client
sanity/
  schemas/          siteSettings, page, service, testimonial, blogPost
sanity.config.ts    Studio config
```

## Build & deploy

```pwsh
npm run build       # always run before declaring done
npm run start
```

## Notes

- Migrated from WordPress at `capabilitycentre.com.au`
- Content scrape pending — placeholder copy throughout
- Logo asset pending — placeholder swoosh in Header/Footer
