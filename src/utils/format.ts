import { DEFAULT_SITE_URL } from "@/config/site";

export function formatDateIndo(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toCanonicalUrl(pathname: string) {
  return new URL(pathname, DEFAULT_SITE_URL).toString();
}

export function formatCount(value: number, noun: string) {
  return `${new Intl.NumberFormat("id-ID").format(value)} ${noun}`;
}
