import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { v as maybeRenderHead, a0 as addAttribute, J as renderTemplate, aT as unescapeHTML, aU as renderHead, aV as renderSlot } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import 'clsx';
import { f as SITE_TAGLINE, B as BRAND_TELEGRAM_HANDLE, e as SITE_NAME, g as getAllCategories, D as DEFAULT_SITE_URL, S as SITE_DESCRIPTION } from './catalog_BdPK18__.mjs';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const topCategories = getAllCategories().slice(0, 6);
  return renderTemplate`${maybeRenderHead()}<footer class="mt-20 border-t border-[color:var(--color-border)] bg-[rgba(250,247,241,0.92)] text-[color:var(--color-body)]"> <div class="container-shell grid gap-10 py-14 md:grid-cols-[1.3fr_0.8fr_0.9fr]"> <div> <p class="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--color-wood-deep)]">Gallery Furnicraft Jepara</p> <h2 class="serif-display mt-3 text-2xl font-semibold text-[color:var(--color-ink)]">${SITE_TAGLINE}</h2> <p class="mt-4 max-w-xl text-sm leading-7 text-[color:var(--color-muted)]">
Pilih model dari katalog, lalu diskusikan ukuran, finishing, ketersediaan, dan pengiriman dengan tim kami lewat Telegram.
</p> </div> <div> <h3 class="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-wood-deep)]">Kategori Favorit</h3> <ul class="mt-4 space-y-3 text-sm text-[color:var(--color-ink)]"> ${topCategories.map((category) => renderTemplate`<li> <a${addAttribute(`/kategori/${category.slug}/`, "href")} class="transition hover:text-[color:var(--color-wood-deep)]"> ${category.label} </a> </li>`)} </ul> </div> <div> <h3 class="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-wood-deep)]">Butuh Bantuan?</h3> <p class="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
Konsultasi via Telegram:
<a${addAttribute(`https://t.me/${BRAND_TELEGRAM_HANDLE}`, "href")} target="_blank" rel="noreferrer" class="font-semibold text-[color:var(--color-ink)] underline decoration-[color:var(--color-highlight)] underline-offset-4">
@${BRAND_TELEGRAM_HANDLE} </a> </p> <p class="mt-5 text-sm leading-7 text-[color:var(--color-muted)]">
Cocok untuk tanya model, ukuran, finishing, stok, hingga ongkir sebelum pemesanan.
</p> <p class="mt-5 text-sm leading-7 text-[color:var(--color-muted)]">
Sudah pesan? <a href="/cek-pesanan/" class="font-semibold text-[color:var(--color-ink)] underline underline-offset-4">Cek status order di sini</a>.
</p> </div> </div> <div class="border-t border-[color:var(--color-border)]"> <div class="container-shell flex flex-col gap-2 py-5 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} ${SITE_NAME}. Furniture dan woodcraft Jepara.</p> <p>Siap membantu konsultasi model dan pemesanan untuk berbagai kebutuhan ruang.</p> </div> </div> </footer>`;
}, "E:/Gallery Jepara/src/components/Footer.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const telegramUrl = `https://t.me/${BRAND_TELEGRAM_HANDLE}`;
  const pathname = Astro2.url.pathname;
  const links = [
    { href: "/", label: "Beranda" },
    { href: "/shop/", label: "Katalog" },
    { href: "/kategori/", label: "Kategori" }
  ];
  function isActive(href) {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(href);
  }
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header class="sticky top-0 z-40 border-b border-[color:var(--color-border)] bg-[rgba(255,253,248,0.9)] backdrop-blur-xl"> <div class="container-shell flex items-center justify-between gap-4 py-4"> <a href="/" class="min-w-0"> <span class="block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-muted)]">\nFurniture Jepara\n</span> <span class="serif-display mt-1 block text-lg font-semibold text-[color:var(--color-ink)] sm:text-xl"> ', ' </span> </a> <nav class="hidden items-center gap-7 text-sm text-[color:var(--color-body)] md:flex"> ', ' </nav> <button type="button" class="mobile-menu-trigger inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/80 text-[color:var(--color-ink)] transition hover:border-[color:var(--color-wood-deep)] hover:text-[color:var(--color-wood-deep)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-highlight)] md:hidden" aria-expanded="false" aria-controls="mobile-sidebar" aria-label="Buka menu navigasi" data-mobile-menu-open> <span class="sr-only">Buka menu</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"> <path d="M4 7h16"></path> <path d="M4 12h16"></path> <path d="M4 17h16"></path> </svg> </button> <a', ' target="_blank" rel="noreferrer" class="hidden md:inline-flex md:px-5 md:py-2.5 md:text-sm">\nKonsultasi via Telegram\n</a> </div> </header> <div class="mobile-sidebar-shell md:hidden" data-mobile-sidebar> <button type="button" class="mobile-sidebar-overlay" aria-label="Tutup menu navigasi" data-mobile-menu-close tabindex="-1"></button> <aside id="mobile-sidebar" class="mobile-sidebar-panel" aria-hidden="true" aria-label="Navigasi mobile"> <div class="flex items-start justify-between gap-4 border-b border-[color:var(--color-border)] px-5 py-5"> <div class="min-w-0"> <span class="block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-muted)]">\nMenu\n</span> <span class="serif-display mt-1 block text-lg font-semibold text-[color:var(--color-ink)]"> ', ' </span> </div> <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/80 text-[color:var(--color-ink)] transition hover:border-[color:var(--color-wood-deep)] hover:text-[color:var(--color-wood-deep)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-highlight)]" aria-label="Tutup menu navigasi" data-mobile-menu-close> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"> <path d="M6 6l12 12"></path> <path d="M18 6L6 18"></path> </svg> </button> </div> <nav class="flex flex-1 flex-col gap-2 px-5 py-6 text-base text-[color:var(--color-body)]"> ', ' </nav> <div class="border-t border-[color:var(--color-border)] px-5 py-5"> <a', ' target="_blank" rel="noreferrer" class="btn-primary w-full">\nKonsultasi via Telegram\n</a> </div> </aside> </div> <script>\n  if (!window.__mobileSidebarBound) {\n    window.__mobileSidebarBound = true;\n\n    const root = document.documentElement;\n    const shell = document.querySelector("[data-mobile-sidebar]");\n    const panel = document.getElementById("mobile-sidebar");\n    const openButtons = document.querySelectorAll("[data-mobile-menu-open]");\n    const closeButtons = document.querySelectorAll("[data-mobile-menu-close]");\n    const navLinks = document.querySelectorAll("[data-mobile-nav-link]");\n\n    const setOpen = (isOpen) => {\n      if (!(shell instanceof HTMLElement) || !(panel instanceof HTMLElement)) {\n        return;\n      }\n\n      shell.dataset.open = isOpen ? "true" : "false";\n      panel.setAttribute("aria-hidden", isOpen ? "false" : "true");\n      root.classList.toggle("mobile-menu-open", isOpen);\n\n      openButtons.forEach((button) => {\n        if (button instanceof HTMLButtonElement) {\n          button.setAttribute("aria-expanded", isOpen ? "true" : "false");\n        }\n      });\n    };\n\n    openButtons.forEach((button) => {\n      button.addEventListener("click", () => setOpen(true));\n    });\n\n    closeButtons.forEach((button) => {\n      button.addEventListener("click", () => setOpen(false));\n    });\n\n    navLinks.forEach((link) => {\n      link.addEventListener("click", () => setOpen(false));\n    });\n\n    document.addEventListener("keydown", (event) => {\n      if (event.key === "Escape") {\n        setOpen(false);\n      }\n    });\n  }\n<\/script>'])), maybeRenderHead(), SITE_NAME, links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
    "transition hover:text-[color:var(--color-wood-deep)]",
    isActive(link.href) ? "font-semibold text-[color:var(--color-wood-deep)]" : ""
  ], "class:list")}> ${link.label} </a>`), addAttribute(telegramUrl, "href"), SITE_NAME, links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute([
    "rounded-2xl px-4 py-3 transition hover:bg-[rgba(47,71,66,0.07)] hover:text-[color:var(--color-wood-deep)]",
    isActive(link.href) ? "bg-[rgba(47,71,66,0.08)] font-semibold text-[color:var(--color-wood-deep)]" : ""
  ], "class:list")} data-mobile-nav-link> ${link.label} </a>`), addAttribute(telegramUrl, "href"));
}, "E:/Gallery Jepara/src/components/Header.astro", void 0);

function formatDateIndo(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}
function toCanonicalUrl(pathname) {
  return new URL(pathname, DEFAULT_SITE_URL).toString();
}
function formatCount(value, noun) {
  return `${new Intl.NumberFormat("id-ID").format(value)} ${noun}`;
}
function formatCurrency(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Menunggu konfirmasi";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = SITE_NAME,
    description = SITE_DESCRIPTION,
    image = null,
    canonicalPath = Astro2.url.pathname,
    type = "website",
    structuredData = null
  } = Astro2.props;
  const pageTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = toCanonicalUrl(canonicalPath);
  const ogImage = image ?? "/favicon.svg";
  return renderTemplate`<html lang="id"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${pageTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="canonical"${addAttribute(canonicalUrl, "href")}><meta property="og:site_name"${addAttribute(SITE_NAME, "content")}><meta property="og:type"${addAttribute(type, "content")}><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(ogImage.startsWith("http") ? ogImage : toCanonicalUrl(ogImage), "content")}><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage.startsWith("http") ? ogImage : toCanonicalUrl(ogImage), "content")}>${structuredData && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredData)))}${renderHead()}</head> <body> <div class="page-shell"> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "E:/Gallery Jepara/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $, formatDateIndo as a, formatCount as b, formatCurrency as f };
