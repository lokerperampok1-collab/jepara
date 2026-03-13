import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { J as renderTemplate, v as maybeRenderHead, a0 as addAttribute } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import { $ as $$OrderStatusPill } from './OrderStatusPill_DIsf8QXm.mjs';
import { $ as $$BaseLayout, f as formatCurrency } from './BaseLayout_Brr0uAoD.mjs';
import { g as getOrderByCode } from './orders_Bqi7bjkL.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const code = Astro2.url.searchParams.get("kode")?.trim() ?? "";
  const errorMessage = Astro2.url.searchParams.get("error");
  const order = code ? await getOrderByCode(code) : null;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Cek Pesanan", "description": "Cari status pesanan, konfirmasi pembayaran, dan pengiriman Gallery Furnicraft Jepara.", "canonicalPath": "/cek-pesanan/" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-shell pb-12 pt-12"> <div class="mx-auto max-w-3xl space-y-8"> <div class="surface-card rounded-[2rem] p-6 text-center sm:p-8"> <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-wood-deep)]">Cek Order</p> <h1 class="serif-display mt-3 text-3xl font-semibold text-[color:var(--color-ink)]">Lacak status pesanan Anda</h1> <p class="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-muted)]">
Masukkan kode order untuk melihat pembayaran, status proses, dan informasi pengiriman.
</p> <form action="/cek-pesanan/" method="get" class="mt-8 flex flex-col gap-3 sm:flex-row"> <input name="kode" type="text"${addAttribute(code, "value")} placeholder="Contoh: GFJ-20260313-AB12" class="form-input flex-1"> <button type="submit" class="btn-primary">Cari pesanan</button> </form> </div> ${errorMessage && renderTemplate`<div class="notice-error">${errorMessage}</div>`} ${code && !order && renderTemplate`<div class="surface-card rounded-[2rem] p-6 text-center sm:p-8"> <p class="text-sm leading-7 text-[color:var(--color-muted)]">
Kode order <span class="font-semibold text-[color:var(--color-body)]">${code}</span> belum ditemukan.
</p> </div>`} ${order && renderTemplate`<a${addAttribute(`/pesanan/${order.orderCode}/`, "href")} class="surface-card block rounded-[2rem] p-6 transition hover:-translate-y-0.5"> <div class="flex flex-wrap items-start justify-between gap-4"> <div> <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-wood-deep)]">${order.orderCode}</p> <h2 class="serif-display mt-3 text-2xl font-semibold text-[color:var(--color-ink)]">${order.item.title}</h2> <p class="mt-3 text-sm leading-7 text-[color:var(--color-muted)]"> ${order.customer.name} • ${formatCurrency(order.payment.amountDueNow)} </p> </div> ${renderComponent($$result2, "OrderStatusPill", $$OrderStatusPill, { "status": order.status })} </div> </a>`} </div> </section> ` })}`;
}, "E:/Gallery Jepara/src/pages/cek-pesanan/index.astro", void 0);

const $$file = "E:/Gallery Jepara/src/pages/cek-pesanan/index.astro";
const $$url = "/cek-pesanan/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
