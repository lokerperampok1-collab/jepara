import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { J as renderTemplate, v as maybeRenderHead, a0 as addAttribute } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import { $ as $$BaseLayout, b as formatCount } from './BaseLayout_Brr0uAoD.mjs';
import { $ as $$SectionHeading } from './SectionHeading_DAZYkjk-.mjs';
import { g as getAllCategories } from './catalog_BdPK18__.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const categories = getAllCategories();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Kategori Produk", "description": "Lihat kategori furniture, dekorasi, ukiran, dan woodcraft Jepara untuk memudahkan pencarian produk.", "canonicalPath": "/kategori/" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-shell pb-8 pt-12"> ${renderComponent($$result2, "SectionHeading", $$SectionHeading, { "eyebrow": "Kategori", "title": "Pilih kategori yang paling dekat dengan kebutuhan Anda.", "description": "Mulai dari furniture rumah, kursi cafe, dekorasi kayu, hingga model custom untuk proyek interior." })} <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${categories.map((category, index) => renderTemplate`<a${addAttribute(`/kategori/${category.slug}/`, "href")}${addAttribute([
    "surface-card rounded-[1.8rem] p-6 transition hover:-translate-y-1",
    index % 4 === 0 ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,240,232,0.94))]" : ""
  ], "class:list")}> <p class="text-xs uppercase tracking-[0.2em] text-[color:var(--color-wood-deep)]">Kategori</p> <h2 class="serif-display mt-3 text-2xl font-semibold text-[color:var(--color-ink)]">${category.label}</h2> <p class="mt-4 text-sm leading-7 text-[color:var(--color-muted)]"> ${formatCount(category.count, "produk")} siap Anda lihat pada kategori ini.
</p> </a>`)} </div> </section> ` })}`;
}, "E:/Gallery Jepara/src/pages/kategori/index.astro", void 0);

const $$file = "E:/Gallery Jepara/src/pages/kategori/index.astro";
const $$url = "/kategori/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
