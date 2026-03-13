export interface RawProduct {
  id: number;
  slug: string;
  title: string;
  sourceLink: string;
  date: string;
  modified: string;
  categories: string[];
  excerpt: string;
  description: string;
  images: string[];
  featuredImage: string | null;
  waPhone: string | null;
  priceRaw: string | null;
  priceValue: number | null;
  priceFormatted: string | null;
  regularPriceValue: number | null;
  salePriceValue: number | null;
  categoryLabels: string[];
}

export type ProductStatus = "ready" | "pre-order" | "open-order" | null;
export type SortKey = "newest" | "oldest" | "price-low" | "price-high";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CategorySummary {
  slug: string;
  label: string;
  count: number;
}

export interface NormalizedProduct extends RawProduct {
  categories: string[];
  categoryLabels: string[];
  categoryItems: CategorySummary[];
  images: string[];
  featuredImage: string | null;
  excerpt: string;
  description: string;
  displayDescription: string;
  descriptionParagraphs: string[];
  specItems: ProductSpec[];
  searchText: string;
  status: ProductStatus;
  statusLabel: string | null;
  primaryCategorySlug: string | null;
  primaryCategoryLabel: string | null;
  telegramHandle: string | null;
  telegramUrl: string | null;
  dateValue: number;
  modifiedValue: number;
}

export interface CatalogIndexItem {
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
  categories: string[];
  categoryLabels: string[];
  priceValue: number | null;
  priceFormatted: string | null;
  statusLabel: string | null;
  dateValue: number;
  url: string;
  searchText: string;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasPrev: boolean;
  hasNext: boolean;
  prevUrl: string | null;
  nextUrl: string | null;
}
