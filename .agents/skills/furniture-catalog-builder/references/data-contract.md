# Data contract notes

The site is driven by `products.json`.

Use these rules:
- `priceValue`: numeric sort/filter value
- `priceFormatted`: UI display value
- `categories`: internal category slugs
- `categoryLabels`: display labels
- `images`: gallery images
- `featuredImage`: primary listing/detail image
- `waPhone`: contact string; may contain a Telegram handle rather than a phone number
- `sourceLink`: original source URL for optional attribution or fallback CTA

Do not rewrite the original data shape unless absolutely required.
