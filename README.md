# More Freedom Ahead

SvelteKit + TypeScript site for More Freedom Ahead, with:

- public marketing pages
- event listings and event registration
- Stripe checkout integration
- Better Auth login
- admin dashboard for events, submissions, content, and settings
- PostgreSQL via Drizzle ORM
- Cloudflare Pages deployment

## Tech Stack

- `svelte` 5 + `@sveltejs/kit` 2
- `typescript`
- `drizzle-orm` + `drizzle-kit`
- `better-auth`
- `stripe`
- `vite`, `vitest`, `eslint`, `prettier`
- `@sveltejs/adapter-cloudflare` + `wrangler`

## Prerequisites

- Node.js 20+
- `pnpm`
- A PostgreSQL database (Neon works well)
- Stripe account (for paid event flows)

## Environment Variables

Create a local env file (for example `.env`) with:

```bash
DATABASE_URL=postgres://...
ORIGIN=http://localhost:5173
BETTER_AUTH_SECRET=replace-with-strong-secret
STRIPE_SECRET_KEY=sk_test_...
```

Notes:

- `DATABASE_URL` is required by Drizzle config and DB runtime.
- `ORIGIN` and `BETTER_AUTH_SECRET` are required by Better Auth.
- `STRIPE_SECRET_KEY` is required for creating Stripe Checkout sessions.

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm dev
```

Local app URL is typically `http://localhost:5173`.

## Database

Generate and apply schema changes:

```bash
pnpm db:generate
pnpm db:push
```

Other useful DB commands:

```bash
pnpm db:migrate
pnpm db:studio
```

## Authentication and Admin Access

- Auth is handled through Better Auth in `src/lib/server/auth.ts`.
- Request/session integration is handled in `src/hooks.server.ts`.
- Admin routes are protected by `requireAdmin()` in `src/lib/server/authz.ts`.
- Admin access is whitelist-based: user email must exist in `admin_user` table.

If a logged-in user is not whitelisted, admin pages redirect to `/demo/better-auth/login`.

## Payments

- Stripe checkout session creation lives in `src/lib/server/payments/stripe.ts`.
- Webhook endpoint exists at `src/routes/api/stripe/webhook/+server.ts`.
- Current webhook handler is intentionally disabled (returns `501`) during build phase.

## Scripts

```bash
pnpm dev            # Start local dev server
pnpm build          # Generate Cloudflare types + build
pnpm preview        # Preview Cloudflare Pages output locally
pnpm check          # Svelte type checks
pnpm check:watch    # Watch mode type checks
pnpm lint           # Prettier + ESLint
pnpm format         # Format codebase
pnpm test           # Run unit tests once
pnpm test:unit      # Run Vitest
pnpm gen            # Regenerate Wrangler types
pnpm auth:schema    # Regenerate Better Auth schema types
```

## Project Structure (high level)

```text
src/routes/(site)         Public-facing pages
src/routes/(admin)        Admin dashboard pages
src/routes/api            API endpoints (e.g. Stripe webhook)
src/lib/server            Server-only logic (auth, db, content, payments)
src/lib/components        Shared Svelte components
src/lib/css/styles.css    Global site styling
```

## Build and Deploy

Build production assets:

```bash
pnpm build
```

Preview with Cloudflare Pages runtime:

```bash
pnpm preview
```

Wrangler config is in `wrangler.jsonc` and Cloudflare output is `.svelte-kit/cloudflare`.
