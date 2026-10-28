# More Freedom Ahead

SvelteKit 5 site on Cloudflare Pages. **All content is managed in Sanity** — there is no database.

- **Pages** are built in Sanity from reusable sections (banner, text, columns, image cards, events, testimonials, forms, donate, button).
- **Events** are Sanity documents; upcoming/past lists are automatic. Paid tickets use Stripe Checkout; free events and forms email the owner via Resend.
- **Sanity Studio** is embedded at `/studio` (Presentation tool gives click-to-edit on the live site).

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in the values (project id: opdzk1nw)
pnpm dev                     # site at :5173, Studio at :5173/studio
pnpm seed                    # (first time only) loads starter pages into Sanity
```

Required env: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (Viewer token).
Optional: `RESEND_API_KEY` + `FORM_FROM_EMAIL` (forms), `STRIPE_SECRET_KEY` (paid events).

## Deploying

1. Set the env vars above in Cloudflare Pages.
2. Allow the production origin for Studio/Visual Editing: `npx sanity cors add https://YOUR-DOMAIN --credentials`.
3. Content changes are live immediately (server-rendered, no rebuild).

## Scripts

`pnpm dev` · `pnpm build` · `pnpm check` · `pnpm lint` · `pnpm test` · `pnpm seed`
