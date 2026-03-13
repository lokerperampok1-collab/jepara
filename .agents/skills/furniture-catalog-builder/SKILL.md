---
name: furniture-catalog-builder
description: Use this skill when building, extending, debugging, or optimizing a furniture or product catalog website that uses products.json as the source of truth. Trigger for tasks involving product pages, category generation, search, filters, pagination, Telegram inquiry flow, SEO, schema mapping, or catalog performance. Do not trigger for unrelated backend systems, auth flows, payment gateways, or generic non-catalog tasks.
---

# Furniture Catalog Builder

This skill is for a product catalog website backed by a local `products.json` file.

## Objectives
- Keep the catalog fast, typed, and SEO-friendly.
- Preserve source data meaning.
- Avoid unnecessary architecture.
- Optimize for browsing and inquiry conversion.

## Expected data shape
Each product usually contains:
- `id`
- `slug`
- `title`
- `sourceLink`
- `date`
- `modified`
- `categories`
- `excerpt`
- `description`
- `images`
- `featuredImage`
- `waPhone`
- `priceRaw`
- `priceValue`
- `priceFormatted`
- `regularPriceValue`
- `salePriceValue`
- `categoryLabels`

## Workflow
1. Inspect `products.json` and create or update TypeScript types.
2. Build a normalization layer instead of mutating the raw JSON.
3. Derive these helpers:
   - category slug to label mapping
   - Telegram contact link
   - product status badge from text like `Ready` or `Pre Order`
   - related products by overlapping categories
   - safe text excerpts and display descriptions
4. Prefer static generation for product and category pages.
5. For large datasets, paginate catalog pages and avoid rendering all products at once.
6. Keep shop search/filter/sort lightweight. If client enhancement is needed, load a reduced catalog index only when necessary.
7. Keep listing pages light and image-efficient.
8. Add page-level SEO metadata and structured data where useful.
9. Validate with a full build before finishing.

## Business rules
- The website is a catalog, not a checkout store.
- Main conversion is inquiry through Telegram.
- Do not add auth, checkout, cart, or database unless explicitly requested.
- Do not fabricate product specs that are missing.
- Do not change the business model by sneaking in marketplace-style flows or generic ecommerce assumptions.

## UI rules
- Language: Indonesian.
- Visual direction: premium handcrafted furniture, warm, clean, modern.
- Mobile-first.

## Quality bar
Before declaring success:
- run the build
- verify at least one product route
- verify at least one category route
- verify sorting / search / pagination logic
- verify the Telegram CTA uses real product context
- keep future Codex guidance files updated if project conventions materially change
