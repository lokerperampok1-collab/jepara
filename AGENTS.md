# AGENTS.md

## Repository expectations
- This repo is an Astro + TypeScript + Tailwind furniture catalog website with manual order flow.
- The single source of truth for product content is `products.json`.
- Catalog browsing and SEO stay product-first. Payments are manual by default, not gateway-driven.
- Do not introduce marketplace features, full cart logic, or automated payment gateway flows unless explicitly requested.
- Keep product, category, and pagination routes generated from catalog data when possible.

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
- Keep checkout and order pages simple, lightweight, and trustworthy.

## Code style
- Keep data utilities separate from UI components.
- Prefer small reusable components.
- Use strict TypeScript types.
- Do not perform broad refactors unless necessary for the current task.
- When changing routing or data mapping, verify generated pages still match real product records.
- Operational order data must stay out of `products.json`.

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Validate data: `npm run validate:data`
- Build: `npm run build`
- Preview: `npm run preview`

## Before finishing any meaningful change
- Run the build.
- Fix TypeScript, server route, and build issues.
- Sanity-check at least one shop page, one product page, one category page, and one order-related route.

## Conversion flow
- Telegram remains available for consultation, using the username parsed from `waPhone`.
- Website checkout supports manual payment, payment confirmation upload, and admin status updates.
- Product CTA can offer both order checkout and Telegram consultation when price data is available.
