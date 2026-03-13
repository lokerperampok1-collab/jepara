import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { J as renderTemplate, v as maybeRenderHead } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import { $ as $$BaseLayout } from './BaseLayout_Brr0uAoD.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Halaman Tidak Ditemukan", "description": "Halaman yang Anda cari tidak tersedia di katalog Gallery Furnicraft Jepara." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-shell flex min-h-[60vh] items-center py-16"> <div class="surface-card w-full rounded-[2.4rem] px-8 py-12 text-center sm:px-12"> <p class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-wood)]">404</p> <h1 class="serif-display mt-4 text-4xl font-semibold text-[color:var(--color-ink)]">Halaman tidak ditemukan</h1> <p class="mx-auto mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-muted)]">
Kembali ke katalog utama untuk melihat produk, kategori, dan halaman detail yang tersedia.
</p> <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"> <a href="/" class="inline-flex items-center justify-center rounded-full bg-[color:var(--color-wood-deep)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--color-wood)]">
Ke Beranda
</a> <a href="/shop/" class="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/80 px-5 py-3 text-sm font-semibold text-[color:var(--color-wood-deep)] transition hover:border-[color:var(--color-wood)]">
Buka Katalog
</a> </div> </div> </section> ` })}`;
}, "E:/Gallery Jepara/src/pages/404.astro", void 0);

const $$file = "E:/Gallery Jepara/src/pages/404.astro";
const $$url = "/404/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
