import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { v as maybeRenderHead, a0 as addAttribute, J as renderTemplate } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import 'clsx';

const $$ProductStatusBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductStatusBadge;
  const { label } = Astro2.props;
  const colorClass = label ? label === "Ready" ? "bg-[rgba(93,106,77,0.16)] text-[color:var(--color-moss)]" : "bg-[rgba(127,79,42,0.14)] text-[color:var(--color-wood-deep)]" : "";
  return renderTemplate`${label && renderTemplate`${maybeRenderHead()}<span${addAttribute(["inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]", colorClass], "class:list")}>${label}</span>`}`;
}, "E:/Gallery Jepara/src/components/ProductStatusBadge.astro", void 0);

const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product, eager = false } = Astro2.props;
  const imageAlt = product.featuredImage ? product.title : "Produk tanpa gambar";
  return renderTemplate`${maybeRenderHead()}<article class="surface-card group overflow-hidden rounded-[1.75rem]"> <a${addAttribute(`/produk/${product.slug}/`, "href")} class="block"> <div class="aspect-[4/4.7] overflow-hidden bg-[rgba(141,113,85,0.06)]"> ${product.featuredImage ? renderTemplate`<img${addAttribute(product.featuredImage, "src")}${addAttribute(imageAlt, "alt")} class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"${addAttribute(eager ? "eager" : "lazy", "loading")} decoding="async">` : renderTemplate`<div class="flex h-full items-center justify-center px-8 text-center text-sm text-[color:var(--color-muted)]">
Foto produk belum tersedia
</div>`} </div> </a> <div class="space-y-4 p-5"> <div class="flex flex-wrap items-center gap-2"> ${renderComponent($$result, "ProductStatusBadge", $$ProductStatusBadge, { "label": product.statusLabel })} ${product.primaryCategoryLabel && renderTemplate`<span class="rounded-full bg-[rgba(32,36,43,0.05)] px-3 py-1 text-xs font-medium text-[color:var(--color-body)]"> ${product.primaryCategoryLabel} </span>`} </div> <div> <h3 class="serif-display text-[1.35rem] font-semibold leading-snug text-[color:var(--color-ink)]"> <a${addAttribute(`/produk/${product.slug}/`, "href")} class="transition hover:text-[color:var(--color-wood)]"> ${product.title} </a> </h3> ${product.excerpt && renderTemplate`<p class="line-clamp-2 mt-3 text-sm leading-6 text-[color:var(--color-muted)]">${product.excerpt}</p>`} </div> <div class="flex items-end justify-between gap-4 border-t border-[color:var(--color-border)] pt-4"> <div> <p class="text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]">Harga</p> <p class="mt-1 text-xl font-semibold text-[color:var(--color-wood-deep)]"> ${product.priceFormatted ?? "Hubungi kami"} </p> </div> <a${addAttribute(`/produk/${product.slug}/`, "href")} class="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/80 px-4 py-2 text-sm font-semibold text-[color:var(--color-ink)] transition hover:border-[color:var(--color-wood-deep)] hover:text-[color:var(--color-wood-deep)]">
Lihat produk
</a> </div> </div> </article>`;
}, "E:/Gallery Jepara/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $ };
