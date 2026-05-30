# Vercel Setup

Vercel project creation requires browser auth (`vercel login`). Run these as
Simon locally once the GitHub repo is live.

## 1. Install / log in

```pwsh
npm i -g vercel
vercel login
```

Choose **Continue with GitHub** and sign in as Simon.

## 2. Link the project

From the repo root:

```pwsh
cd D:\dev\CapabilityCentre\capability-centre-next
vercel link
```

When prompted:

- **Set up and deploy?** Yes
- **Scope:** Simon's personal scope (or the `sjb247-bakes` team if it exists)
- **Link to existing project?** No
- **Project name:** `capability-centre`
- **Directory:** `./`
- **Override settings?** No

## 3. Add environment variables

In the Vercel dashboard for `capability-centre`:

**Settings → Environment Variables**, add for **Production, Preview, Development**:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | (from Sanity) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | (from Sanity → API → Tokens) |
| `NEXT_PUBLIC_SITE_URL` | `https://capabilitycentre.com.au` |
| `RESEND_API_KEY` | (from resend.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | (from Supabase) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Supabase) |

## 4. Domain

- **Settings → Domains → Add** `capabilitycentre.com.au`
- Update DNS to point at Vercel (A or CNAME as instructed)
- This will replace the current WordPress host — coordinate cutover

## 5. Build settings

Default settings work — Next.js auto-detected. No overrides needed.
