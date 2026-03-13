# AGENTS.md

## Repository expectations
- This repo is an Astro + TypeScript + Tailwind product catalog website.
- The single source of truth for products is `products.json`.
- Do not introduce a database, admin panel, auth, or checkout flow unless explicitly requested.
- This website is a catalog and inquiry site, not a full ecommerce checkout system.
- Keep the project static-first. Product, category, and pagination routes should be generated from data when possible.

## Data rules
- Preserve the raw product schema from `products.json`.
- Use `priceValue` for logic and sorting.
- Use `priceFormatted` for display.
- Use `categoryLabels` for human-facing labels when present.
- Use `categories` as slugs or internal grouping keys.
- `waPhone` may contain a Telegram handle. Parse it carefully and do not assume WhatsApp.
- Hide missing data instead of inventing content.
- Do not rewrite or reshape `products.json` manually unless there is a verified source-data formatting issue.

## UX and performance
- Keep the UI in Indonesian.
- Prioritize mobile performance.
- Do not load the full catalog into a heavy interactive client component if static generation or paginated rendering can avoid it.
- Lazy-load non-critical images.
- On listing pages, render only the image needed for the card.
- Avoid unnecessary hydration.
- Do not mirror remote product images locally unless explicitly required.

## Code style
- Keep data utilities separate from UI components.
- Prefer small reusable components.
- Use strict TypeScript types.
- Do not perform broad refactors unless necessary for the current task.
- When changing routing or data mapping, verify generated pages still match real product records.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Validate data: `npm run validate:data`
- Build: `npm run build`
- Preview: `npm run preview`

## Before finishing any meaningful change
- Run the build.
- Fix TypeScript and route issues.
- Sanity-check at least one shop page, one product page, and one category page.

## Inquiry flow
- Main conversion path is Telegram, using the username parsed from `waPhone`.
- Product CTA should include real product context in the Telegram message when the handle supports it.
