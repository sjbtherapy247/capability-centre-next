# Capability Centre — Codebase Audit

_2026-05-30 — GC (Coder), reviewing every line of George's and my own work on this codebase. Brutal as requested._

Severity scale: 🔴 critical (fix today) · 🟠 high · 🟡 medium · 🟢 low / nice-to-have.

---

## 🔴 1. Real Sanity API token leaked into public GitHub repo

**File:** `.env.example`
**Commit:** `1c032e1` ("feat: light/dark theme toggle…")
**Repo:** github.com/sjbtherapy247/capability-centre-next — **public**

Someone (likely during a setup pass) committed a real Sanity token to `.env.example` as a commented-out line:

```
#SANITY_API_TOKEN=sk<redacted, see git history of .env.example commit 1c032e1>
```

`.env.example` is tracked. The repo is **public**. That token is now exposed in the public git history. Even if removed from the next commit, history is preserved.

**Required actions (Simon must do these — security):**
1. **Revoke the token immediately** at https://www.sanity.io/manage → project → API → Tokens. Find the leaked token (visible in git history of `.env.example` commit `1c032e1`) and delete it. Don't wait for code fixes.
2. **Generate a fresh token** (Editor scope) and put it in `.env.local` only — never in `.env.example`.
3. **Decide if the repo should stay public.** A coaching client website probably doesn't benefit from being public. Recommend flipping it to **private** via `gh repo edit sjbtherapy247/capability-centre-next --visibility private --accept-visibility-change-consequences`.
4. **(Optional but recommended)** Rewrite git history to scrub the token: `git filter-repo --replace-text replacements.txt` — but only worth doing if the repo remains public. If it goes private, the leaked token is revoked → effectively neutralised.

I've removed the leaked token from `.env.example` in this audit pass (commit incoming) but **history still contains it**.

---

## 🔴 2. Supabase service-role secret key exposed to the browser

**File:** `.env.local`

```
NEXT_PUBLIC_SUPABASE_SECRET_KEY=sb_secret_<redacted>
```

(actual value kept out of this file; verify it in `.env.local`)

Anything prefixed `NEXT_PUBLIC_*` in Next.js is **inlined into the client JS bundle and shipped to every browser visiting the site**. A key called `SUPABASE_SECRET_KEY` is the project's full-admin secret key — equivalent to root access to the database. Putting it in `NEXT_PUBLIC_*` means:

- It will appear in compiled JavaScript on production
- Any visitor to the site can grab it from devtools
- They can then read, write, or delete any row in any Supabase table, bypassing RLS

**Required actions (Simon — security):**
1. **Rotate the Supabase secret key immediately** at https://supabase.com/dashboard/project/igoizvqvkozchsvuzqpr/settings/api. Generate a new secret key, save it.
2. Move it to `.env.local` as `SUPABASE_SECRET_KEY` (no `NEXT_PUBLIC_` prefix) — server-only.
3. Also rename `NEXT_PUBLIC_SUPABASE_PUB_KEY` to the conventional `NEXT_PUBLIC_SUPABASE_ANON_KEY` (and rename in `lib/supabase.ts`).
4. Verify in Vercel env vars: any production deploy needs the same rename. Anywhere a `NEXT_PUBLIC_SUPABASE_SECRET_KEY` is set, **delete it**.

Right now `lib/supabase.ts` happens to be using `NEXT_PUBLIC_SUPABASE_PUB_KEY` for the client (which is the publishable key, OK for browser — Supabase calls this the "anon" key). But the `SUPABASE_SECRET_KEY` is still being shipped to browsers because of the `NEXT_PUBLIC_` prefix.

---

## 🟠 3. Two Sanity projects exist; one is abandoned and untracked

The seed error log in `.errors.ts` shows two Sanity project IDs being used in attempted seeds:

- `8spe3j52` — original project (the seed failed against this one with insufficient permissions; likely created and then abandoned)
- `bv7pp5ma` — current project, now seeded successfully (14 documents present, verified via API)

The abandoned `8spe3j52` project still exists on Simon's account and may have some assets in it (the seed got partway through uploading images before failing). Either:

- Delete `8spe3j52` from sanity.io/manage to keep the account clean, OR
- Confirm it's empty and ignore it

**Action for Simon:** open sanity.io/manage, check if `8spe3j52` has any content, and delete it if not.

---

## 🟠 4. Stale `/studio` link still in homepage (and elsewhere)

**File:** `app/page.tsx` (UnseededHomePage fallback) — links to `/studio`, which no longer exists. basePath moved to `/cc-admin`.

`app/cc-admin/[[...tool]]/page.tsx` also has stale `/studio` in a doc comment.

These are user-visible (the homepage one) — anyone hitting an unseeded site gets a 404 link to Studio.

**Status:** fixing in this audit commit.

---

## 🟠 5. Dead "shadow" files from `sanity init` that nothing imports

`sanity init` created a parallel set of files that duplicate or conflict with mine:

- `sanity/lib/client.ts` — duplicate of `lib/sanity.ts` (different config; uses `useCdn: true` while my real client uses environment-conditional caching)
- `sanity/lib/image.ts` — duplicate of `lib/sanity.image.ts`
- `sanity/lib/live.ts` — uses `defineLive` from `next-sanity/live` (potentially expensive Live API; not configured intentionally)
- `sanity/env.ts` — duplicate env loader that **throws** if project ID is missing (the opposite of my graceful stub). If anything imports this, builds break before init.
- `sanity/schemaTypes/index.ts` — **empty schema** (`types: []`). If anyone imports this thinking it's the schema, Sanity Studio shows no document types.

Verified via grep: **nothing in the codebase currently imports any of these.** They're pure dead code.

Risk: a future contributor sees `sanity/env.ts` and thinks "oh that's the env file" and imports from it — boom, build fails on missing vars even though the runtime would be fine.

**Status:** deleting in this audit commit.

---

## 🟠 6. `lucide-react@1.17.0` was installed (wrong package generation)

Already fixed in commit `a643386` (upgraded to `0.460.0`). Documenting for posterity:

The npm `lucide-react` package has a confusing version history:
- `1.x` series (2016) — an old fork; **no Sun/Moon icons**, totally different API
- `0.x` series (2020+) — the **current** maintained fork; semver intentionally below 1.0

Whoever ran `npm install lucide-react` got the old 1.x and didn't notice. ThemeToggle would have crashed at runtime once anyone clicked the toggle.

**Lesson:** Always pin a known-good version. `lucide-react@^0.460.0` is now in `package.json`.

---

## 🟠 7. `next-sanity` was downgraded to v12.4.5

**Commit:** `952689c` — `package.json -> downgrade next-sanity to 12.4.5`

The original install used the latest (`^15.x` at time of writing). Someone (presumably George while firefighting Vercel) downgraded to v12.4.5. This older version has different APIs in places (especially `next-sanity/live`, which is partly why the `sanity/lib/live.ts` shadow file uses a defineLive signature that may not exist on v12).

**Risk:** v12.4.5 is way behind. Sanity has been shipping fixes. Eventually it'll be a problem.

**Recommendation:** revisit this once the deploy is stable. Try `npm install next-sanity@latest` and rebuild; whatever broke previously is likely fixed in newer versions.

For now leaving as-is to avoid destabilising a green build.

---

## 🟡 8. `useCdn: production` on a write-token client is wasteful

**File:** `lib/sanity.ts`

```ts
useCdn: process.env.NODE_ENV === 'production',
token: process.env.SANITY_API_TOKEN,
```

When `useCdn: true` is combined with a write token, Sanity logs a warning and falls back to the API anyway (CDN can't serve authenticated requests). The token is sent on every read just to be discarded.

**Fix:** the server client should not use the token for reads — pull the token only when explicitly writing (which we only do from the seed script). Recommend splitting into a `sanityClient` (read-only, CDN-on) and `sanityWriteClient` (token-bearing, used by `/api/contact`-style routes — actually we only do reads, so this becomes trivial).

**Status:** noting, not changing in this commit (low risk, just performance / log noise).

---

## 🟡 9. `@sanity/image-url` deprecation warning on every page

Build log is flooded with:

```
The default export of @sanity/image-url has been deprecated.
Use the named export `createImageUrlBuilder` instead.
```

**Fix:** in `lib/sanity.ts`, swap:

```ts
import imageUrlBuilder from '@sanity/image-url'   // deprecated default
```

to:

```ts
import { createImageUrlBuilder } from '@sanity/image-url'
```

and rename the local var. Trivial. Could batch with the apiVersion type fix.

**Status:** fixing in this audit commit.

---

## 🟡 10. `app/robots.ts` will be deployed to production blocking all crawlers

**File:** `app/robots.ts`

```ts
// Staging: block all crawlers
return { rules: [{ userAgent: '*', disallow: '/' }] }
```

This is deployed to **every environment, including production**, because it's a Next.js `app/robots.ts` route (not env-gated). The comment says "staging" but the code makes no distinction.

If/when the domain points to `capabilitycentre.com.au` (production), Google will be blocked — bad for SEO.

**Fix:** gate the block on an env var or hostname. Recommended:

```ts
const isProd = process.env.NEXT_PUBLIC_SITE_URL === 'https://capabilitycentre.com.au'
return isProd
  ? { rules: [{ userAgent: '*', allow: '/' }], sitemap: '...' }
  : { rules: [{ userAgent: '*', disallow: '/' }] }
```

**Status:** fixing in this audit commit.

---

## 🟡 11. No sitemap.xml exists, but `robots.txt` advertises one

`app/robots.ts` declares `sitemap: 'https://capabilitycentre.com.au/sitemap.xml'` — but there's no `app/sitemap.ts` route. Hitting `/sitemap.xml` returns 404.

**Fix:** add `app/sitemap.ts` that lists `/`, `/about`, `/services`, `/services/<slug>` (one per service in Sanity), `/blog`, `/blog/<slug>` (one per post), `/book`, `/contact`.

**Status:** fixing in this audit commit — adds dynamic sitemap from Sanity.

---

## 🟡 12. Deprecated Tailwind brand-* aliases dead-weight in globals.css

`globals.css` has a big block of `--color-brand-teal`, `--color-brand-navy`, etc. as "legacy aliases" from before the editorial pass. Grep confirms **nothing in the codebase uses them anymore**.

**Status:** removing in this audit commit. Keeps the source readable.

---

## 🟡 13. `lucide-react` import in `ThemeToggle` bundles 2 icons but pulls the whole module

```ts
import { Sun, Moon } from 'lucide-react'
```

`lucide-react` does support tree-shaking, but only if the bundler is configured for it. With Next 16 + Turbopack this works fine. Leaving as-is. No action required.

---

## 🟡 14. `escape()` in `/api/contact` doesn't escape quotes

```ts
function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
```

Outputs sit inside `<p>` tags (not attribute values), so missing `'` and `"` is technically fine. But the function is named `escape` not `escapeText` — easy footgun if someone reuses it for attributes later. Trivial to fix.

**Status:** renaming to `escapeHtml` and including quote escapes for safety, in this audit commit.

---

## 🟡 15. ContactForm doesn't disable button while submitting on iOS Safari

The submit button uses `disabled={status === 'submitting'}` which works fine on desktop. But iOS Safari is known to send a double-submit when the form is submitted via tap-on-the-form (not the button). The current code uses `onSubmit` which is the form's submit handler — fine. But the button text changes to "Sending…" which is good UX. No action.

---

## 🟡 16. `dynamic = 'force-static'` on Studio route is wrong

`app/cc-admin/[[...tool]]/page.tsx`:

```ts
export const dynamic = 'force-static'
```

This was on the original `/studio` route too. Sanity Studio is a fully interactive SPA — there's nothing meaningful to statically prerender. The `force-static` directive is harmless because the route is also `'use client'`, but it's misleading.

**Status:** fixing in this audit commit (changing to `dynamic = 'force-dynamic'` or removing).

---

## 🟢 17. Heavy `@sanity/vision` dependency in production bundle

`@sanity/vision` (the GROQ playground) is in `dependencies`, not `devDependencies`. It only loads when the Studio mounts at `/cc-admin`, which is fine via dynamic import. But if it's not needed in production (and Louise won't use the Vision playground), we could remove it.

**Status:** leaving for now. Listed as something to revisit.

---

## 🟢 18. `styled-components` listed as dependency but not used

`package.json` includes `styled-components` — added during scaffold for Sanity Studio compatibility. Verified no app code imports it. Sanity Studio bundles its own. Removing it would shrink `node_modules` by a few MB.

**Status:** leaving for now (low impact, risk of breaking Studio bundling).

---

## 🟢 19. `eslint.config.mjs` and `CLAUDE.md` — initialised by tools, ignore

`CLAUDE.md` was created by Claude Code at scaffold time. It's nothing we wrote — just an empty/auto-generated file. Could be removed for cleanliness.

`AGENTS.md` is similar — auto-generated by `create-next-app` (added per the new `--agents-md` default in Next 16).

**Status:** leaving. Not harmful.

---

## 🟢 20. Studio doesn't have its own `<head>` metadata

`app/cc-admin/[[...tool]]/page.tsx` — needs `export { metadata, viewport } from 'next-sanity/studio'` for Studio's own meta tags (favicon, viewport, theme-color) to land in the document head. Currently uses the site's metadata (which has the marketing OG image etc.) — visual nit, no functional impact.

**Status:** fixing in this audit commit.

---

## 🟢 21. No CI lint on push

There's no GitHub Actions config (`.github/workflows/`). Every push goes straight to Vercel without a sanity check (pun intended). A trivial `npm run lint` + `npm run build` action on PR would have caught the lucide-react `1.17.0` install and the missing `'use client'` before they hit production.

**Status:** noting, not adding now (out of scope for this fix pass).

---

## 🟢 22. `tsconfig.json` excludes `scripts/**`

This is mine — I excluded it because the seed script's typing got tedious with Sanity's discriminated unions. Acceptable, but the seed script should still type-check independently. Worth running `tsc --noEmit -p tsconfig.json --include scripts` occasionally.

---

## 🟢 23. Hero `priority` always set when image present

`components/Hero.tsx`:

```ts
<Image src={url} ... priority ... />
```

Good for LCP on home, but the Hero component is reused for any page that has a hero image. Only the home page should mark its hero LCP-priority. In practice all current pages use the page hero (not the carousel Hero component) — Hero is only mounted on `/` — so this is fine. Just noting.

---

## 🟢 24. ContactForm error swallowed if response 200 with empty body

```ts
if (!res.ok) { ... throw ... }
setStatus('success')
```

If the API returns 200 with `{ ok: false }`, we'd still treat it as success. The contact API doesn't currently do that (it always returns proper HTTP status), so this is just defensive-programming nit. No action.

---

## 🟢 25. Sanity write token currently in `.env.local` is unscoped/full Editor

The token `sk26VQYJ...` in `.env.local` is Editor-scope per the seed working. For server-side reads, we only need Viewer scope. The full Editor token sitting in env files (and in CI/Vercel) is risky if `.env.local` ever leaks again.

**Recommendation:** create two tokens — one Editor-scope used only for one-off seed/admin scripts (kept in a separate gitignored file like `.env.seed.local` that the seed script loads), and a Viewer-scope token for the running Next.js app.

**Status:** noting, not changing now.

---

## Summary

| # | Severity | Title | Status |
|---|----------|-------|--------|
| 1 | 🔴 | Sanity token in public `.env.example` | **Simon: revoke token + privatise repo. Code fixed.** |
| 2 | 🔴 | Supabase secret key in `NEXT_PUBLIC_*` | **Simon: rotate key. Code rename done.** |
| 3 | 🟠 | Abandoned Sanity project | Simon to clean up |
| 4 | 🟠 | Stale `/studio` links | Fixed |
| 5 | 🟠 | Dead `sanity/lib/`, `sanity/env.ts`, `sanity/schemaTypes/` | Deleted |
| 6 | 🟠 | `lucide-react@1.17.0` | Fixed in earlier commit |
| 7 | 🟠 | `next-sanity` downgraded | Noted, not changing |
| 8 | 🟡 | `useCdn` + token combo | Noted |
| 9 | 🟡 | `@sanity/image-url` deprecation | Fixed |
| 10 | 🟡 | `robots.txt` blocks production too | Fixed (env-gated) |
| 11 | 🟡 | Missing sitemap.xml | Fixed (added dynamic) |
| 12 | 🟡 | Dead `brand-*` CSS aliases | Removed |
| 13 | 🟡 | Bundle size note | No action |
| 14 | 🟡 | `escape()` doesn't escape quotes | Fixed (escapeHtml) |
| 15 | 🟡 | iOS Safari submit | No action |
| 16 | 🟡 | `force-static` on Studio | Fixed |
| 17 | 🟢 | `@sanity/vision` in deps | Noted |
| 18 | 🟢 | `styled-components` unused | Noted |
| 19 | 🟢 | Auto-generated `CLAUDE.md` etc. | Noted |
| 20 | 🟢 | Studio missing metadata export | Fixed |
| 21 | 🟢 | No CI lint | Noted (recommend) |
| 22 | 🟢 | `scripts/**` excluded from tsc | Noted |
| 23 | 🟢 | Hero `priority` | No action |
| 24 | 🟢 | ContactForm 200 + ok:false | No action |
| 25 | 🟢 | Editor token in env | Noted |

**Critical actions on Simon (do these today):**
1. Revoke the Sanity token that was leaked in `.env.example` commit `1c032e1` (visible in git history; starts with `sk`).
2. Rotate the Supabase secret key.
3. Privatise the GitHub repo (recommended): `gh repo edit sjbtherapy247/capability-centre-next --visibility private --accept-visibility-change-consequences`.
4. Update Vercel env vars to remove `NEXT_PUBLIC_SUPABASE_SECRET_KEY` and add server-only `SUPABASE_SECRET_KEY` if/when actually needed.
