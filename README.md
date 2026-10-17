# Chubbs Pâtisserie

A Next.js storefront for cakes and tarts, with WhatsApp ordering. Production is a static export hosted on Cloudflare Pages. There is no checkout, database or application server.

## Local development

```sh
bun install --frozen-lockfile
bun run dev
```

## Content

- Edit product descriptions, layers and optional prices in `src/data/products.ts`.
- Edit the WhatsApp contact and social links in `src/data/site.ts`.
- Store product photography in `public/images/` and logo assets in `public/brand/`.
- Keep images compressed. Static hosting does not run Next.js image optimization.
- Update `metadataBase` in `src/app/layout.tsx` when the public domain changes.

## Checks

```sh
bun run lint
bun run build
```

The build typechecks and writes the homepage, seven product pages and static assets to `out/`. Test the exported files and direct product URLs before publishing. `next start` is not used with a static export.

Run `bun run preview` after building to serve the exported site locally through Wrangler.

## Cloudflare Pages

Public site: https://chubbs-patisserie.pages.dev

This is a Direct Upload project. Pushing to GitHub does not automatically deploy it.

Authorize Wrangler from any device without sharing passwords or API tokens:

```sh
bunx wrangler login --device --browser=false --scopes account:read user:read pages:write
```

Build and deploy a checked-out production revision:

```sh
bun run build
CLOUDFLARE_ACCOUNT_ID=3ec23b7e16a1498b0f0864461d4832ee bunx wrangler pages deploy out --project-name chubbs-patisserie --branch main
```

`--branch main` publishes production. Use a different branch name for a preview. The account identifier is not a credential and is supplied through the environment because Pages configuration files do not accept `account_id`. Keep credentials and local Wrangler state out of Git.
