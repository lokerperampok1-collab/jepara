import rawProducts from "../../products.json";
import {
  BRAND_TELEGRAM_HANDLE,
  DEFAULT_SITE_URL,
  PRODUCTS_PER_PAGE,
} from "@/config/site";
import type {
  CatalogIndexItem,
  CategorySummary,
  NormalizedProduct,
  PaginationMeta,
  ProductSpec,
  ProductStatus,
  RawProduct,
  SortKey,
} from "@/types/catalog";

const sourceProducts = rawProducts as RawProduct[];

const MOJIBAKE_FIXES: Array<[RegExp, string]> = [
  [/â€“/g, "-"],
  [/â€”/g, "-"],
  [/â€¦/g, "..."],
  [/â€œ|â€/g, '"'],
  [/â€™/g, "'"],
  [/Â/g, ""],
];

function normalizeText(value: string | null | undefined) {
  let next = value ?? "";

  for (const [pattern, replacement] of MOJIBAKE_FIXES) {
    next = next.replace(pattern, replacement);
  }

  return next.replace(/\r/g, "").trim();
}

function normalizeInlineText(value: string | null | undefined) {
  return normalizeText(value).replace(/\s+/g, " ").trim();
}

function stripMarkdownMarkers(value: string) {
  return value.replace(/\*+/g, "").trim();
}

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function createCategoryMap(products: RawProduct[]) {
  const categoryMap = new Map<string, CategorySummary>();

  for (const product of products) {
    product.categories.forEach((slug, index) => {
      const label = normalizeInlineText(product.categoryLabels[index]) || titleCase(slug.replace(/-/g, " "));
      const current = categoryMap.get(slug);
      if (current) {
        current.count += 1;
      } else {
        categoryMap.set(slug, {
          slug,
          label,
          count: 1,
        });
      }
    });
  }

  return categoryMap;
}

const categoryMap = createCategoryMap(sourceProducts);

function parseTelegramHandle(contact: string | null | undefined) {
  const text = normalizeInlineText(contact);
  const handleMatch = text.match(/telegram\s*:\s*@?([a-z0-9_]{5,})/i) ?? text.match(/@([a-z0-9_]{5,})/i);
  return handleMatch?.[1] ?? null;
}

function inferStatus(text: string): { status: ProductStatus; label: string | null } {
  const haystack = normalizeInlineText(text).toLowerCase();

  if (/(pre[\s-]?order|\*pre order\*|\bpo\b)/i.test(haystack)) {
    return { status: "pre-order", label: "Pre Order" };
  }

  if (/open order/i.test(haystack)) {
    return { status: "open-order", label: "Open Order" };
  }

  if (/(stock ready|stok ready|ready stock|\bready\b)/i.test(haystack)) {
    return { status: "ready", label: "Ready" };
  }

  return { status: null, label: null };
}

function extractSpecs(description: string) {
  const lines = normalizeText(description)
    .split("\n")
    .map((line) => stripMarkdownMarkers(line).trim())
    .filter(Boolean);

  const specs: ProductSpec[] = [];
  let inSpecs = false;

  for (const line of lines) {
    if (/^spesifikasi/i.test(line)) {
      inSpecs = true;
      continue;
    }

    if (!inSpecs) {
      continue;
    }

    if (
      line.startsWith("#") ||
      /^\**\s*gallery furnicraft jepara/i.test(line) ||
      /^[-–]\s+pengrajin/i.test(line)
    ) {
      break;
    }

    const match = line.match(/^([^:]{2,40})\s*:\s*(.+)$/);
    if (!match) {
      continue;
    }

    specs.push({
      label: titleCase(stripMarkdownMarkers(match[1])),
      value: stripMarkdownMarkers(match[2]),
    });
  }

  return specs;
}

function stripHashtags(value: string) {
  return value
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n")
    .replace(/(?:^|\s)#[\p{L}\p{N}_-]+/gu, "")
    .trim();
}

function buildDescriptionParagraphs(title: string, description: string) {
  const cleaned = stripHashtags(normalizeText(description));
  const blocks = cleaned
    .split(/\n{2,}/)
    .map((block) => stripMarkdownMarkers(normalizeInlineText(block)))
    .filter(Boolean)
    .filter((block) => !/^spesifikasi$/i.test(block))
    .filter((block) => !/^\**\s*gallery furnicraft jepara/i.test(block))
    .filter((block) => !/^[-–]\s+pengrajin/i.test(block));

  return blocks.filter((block, index) => {
    if (index === 0) {
      return block.toLowerCase() !== normalizeInlineText(title).toLowerCase();
    }
    return true;
  });
}

function buildExcerpt(excerpt: string, description: string) {
  const candidate = normalizeInlineText(excerpt).replace(/read more$/i, "").trim();
  if (candidate) {
    return candidate;
  }

  const fallback = buildDescriptionParagraphs("", description)[0] ?? "";
  return fallback;
}

function buildTelegramUrl(handle: string | null, title: string, slug: string) {
  const username = handle ?? BRAND_TELEGRAM_HANDLE;
  if (!username) {
    return null;
  }

  const productUrl = new URL(`/produk/${slug}/`, DEFAULT_SITE_URL).toString();
  const message = `Halo Gallery Furnicraft Jepara, saya tertarik dengan produk ${title}. Link produk: ${productUrl}`;
  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}

function createCategoryItems(slugs: string[]) {
  return slugs
    .map((slug) => categoryMap.get(slug))
    .filter((entry): entry is CategorySummary => Boolean(entry));
}

function normalizeProduct(product: RawProduct): NormalizedProduct {
  const title = normalizeInlineText(product.title);
  const description = normalizeText(product.description);
  const excerpt = buildExcerpt(product.excerpt, description);
  const categoryItems = createCategoryItems(product.categories);
  const statusInfo = inferStatus(`${product.excerpt}\n${product.description}`);
  const telegramHandle = parseTelegramHandle(product.waPhone);
  const images = Array.isArray(product.images)
    ? product.images.filter((image): image is string => Boolean(normalizeInlineText(image)))
    : [];
  const featuredImage = normalizeInlineText(product.featuredImage) || images[0] || null;
  const descriptionParagraphs = buildDescriptionParagraphs(title, description);
  const displayDescription = descriptionParagraphs.join("\n\n");
  const specItems = extractSpecs(description);

  return {
    ...product,
    title,
    excerpt,
    description,
    images,
    featuredImage,
    categories: [...product.categories],
    categoryLabels: [...product.categoryLabels],
    categoryItems,
    descriptionParagraphs,
    displayDescription,
    specItems,
    searchText: normalizeInlineText(
      [
        title,
        excerpt,
        displayDescription,
        product.categories.join(" "),
        product.categoryLabels.join(" "),
      ].join(" "),
    ).toLowerCase(),
    status: statusInfo.status,
    statusLabel: statusInfo.label,
    primaryCategorySlug: categoryItems[0]?.slug ?? product.categories[0] ?? null,
    primaryCategoryLabel: categoryItems[0]?.label ?? product.categoryLabels[0] ?? null,
    telegramHandle,
    telegramUrl: buildTelegramUrl(telegramHandle, title, product.slug),
    dateValue: new Date(product.date).getTime(),
    modifiedValue: new Date(product.modified).getTime(),
  };
}

const normalizedProducts = sourceProducts
  .map(normalizeProduct)
  .sort((left, right) => right.dateValue - left.dateValue);

const productBySlug = new Map(normalizedProducts.map((product) => [product.slug, product]));
const allCategories = [...categoryMap.values()].sort((left, right) => right.count - left.count);

export function getAllProducts() {
  return normalizedProducts;
}

export function getProductBySlug(slug: string) {
  return productBySlug.get(slug) ?? null;
}

export function getAllCategories() {
  return allCategories;
}

export function getCategoryBySlug(slug: string) {
  return categoryMap.get(slug) ?? null;
}

export function getNewestProducts(limit = 8) {
  return normalizedProducts.slice(0, limit);
}

export function getHighlightedProducts(limit = 8) {
  return [...normalizedProducts]
    .sort((left, right) => {
      const leftScore =
        (left.featuredImage ? 2 : 0) +
        (left.statusLabel ? 1 : 0) +
        left.categories.length +
        (left.priceValue ? 1 : 0);
      const rightScore =
        (right.featuredImage ? 2 : 0) +
        (right.statusLabel ? 1 : 0) +
        right.categories.length +
        (right.priceValue ? 1 : 0);
      return rightScore - leftScore || right.dateValue - left.dateValue;
    })
    .slice(0, limit);
}

export function getProductsByCategory(slug: string) {
  return normalizedProducts.filter((product) => product.categories.includes(slug));
}

export function getRelatedProducts(product: NormalizedProduct, limit = 4) {
  return normalizedProducts
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => ({
      candidate,
      score: candidate.categories.filter((category) => product.categories.includes(category)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || right.candidate.dateValue - left.candidate.dateValue)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function sortProducts(products: NormalizedProduct[], sort: SortKey) {
  const items = [...products];

  items.sort((left, right) => {
    if (sort === "oldest") {
      return left.dateValue - right.dateValue;
    }

    if (sort === "price-low") {
      return (left.priceValue ?? Number.MAX_SAFE_INTEGER) - (right.priceValue ?? Number.MAX_SAFE_INTEGER);
    }

    if (sort === "price-high") {
      return (right.priceValue ?? -1) - (left.priceValue ?? -1);
    }

    return right.dateValue - left.dateValue;
  });

  return items;
}

export function paginateProducts<T>(
  items: T[],
  currentPage: number,
  pageSize = PRODUCTS_PER_PAGE,
  createPageUrl: (page: number) => string,
) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  const meta: PaginationMeta = {
    currentPage: safePage,
    totalPages,
    totalItems,
    pageSize,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    prevUrl: safePage > 1 ? createPageUrl(safePage - 1) : null,
    nextUrl: safePage < totalPages ? createPageUrl(safePage + 1) : null,
  };

  return {
    items: pageItems,
    meta,
  };
}

export function buildCatalogIndex() {
  const indexItems: CatalogIndexItem[] = normalizedProducts.map((product) => ({
    slug: product.slug,
    title: product.title,
    excerpt: product.excerpt,
    image: product.featuredImage,
    categories: product.categories,
    categoryLabels: product.categoryItems.map((category) => category.label),
    priceValue: product.priceValue,
    priceFormatted: product.priceFormatted,
    statusLabel: product.statusLabel,
    dateValue: product.dateValue,
    url: `/produk/${product.slug}/`,
    searchText: product.searchText,
  }));

  return {
    generatedAt: new Date().toISOString(),
    totalProducts: indexItems.length,
    categories: allCategories,
    pageSize: PRODUCTS_PER_PAGE,
    items: indexItems,
  };
}
