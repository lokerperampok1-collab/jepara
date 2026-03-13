import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { J as renderTemplate, v as maybeRenderHead, a0 as addAttribute } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_XwPFOWOU.mjs';
import { $ as $$OrderStatusPill } from './OrderStatusPill_DIsf8QXm.mjs';
import { $ as $$BaseLayout, a as formatDateIndo, f as formatCurrency } from './BaseLayout_Brr0uAoD.mjs';
import { l as listOrders } from './orders_Bqi7bjkL.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const orders = await listOrders();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Admin Pesanan", "description": "Daftar pesanan website untuk verifikasi pembayaran, proses, dan pengiriman.", "canonicalPath": "/admin/pesanan/" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-shell pb-12 pt-12"> <div class="flex flex-wrap items-start justify-between gap-4"> <div> <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-wood-deep)]">Admin</p> <h1 class="serif-display mt-3 text-3xl font-semibold text-[color:var(--color-ink)]">Pesanan Website</h1> <p class="mt-4 text-sm leading-7 text-[color:var(--color-muted)]">
Kelola pembayaran manual, update status, dan isi resi pengiriman dari satu halaman.
</p> </div> <a href="/cek-pesanan/" class="btn-secondary">Halaman cek order</a> </div> <div class="surface-card mt-8 overflow-hidden rounded-[2rem]"> <div class="overflow-x-auto"> <table class="min-w-full"> <thead> <tr class="border-b border-[color:var(--color-border)] bg-[rgba(32,36,43,0.03)] text-left text-xs uppercase tracking-[0.18em] text-[color:var(--color-muted)]"> <th class="px-5 py-4">Order</th> <th class="px-5 py-4">Pembeli</th> <th class="px-5 py-4">Tagihan awal</th> <th class="px-5 py-4">Status</th> <th class="px-5 py-4">Aksi</th> </tr> </thead> <tbody> ${orders.map((order) => renderTemplate`<tr class="border-b border-[color:var(--color-border)] last:border-none"> <td class="px-5 py-4"> <p class="font-semibold text-[color:var(--color-ink)]">${order.orderCode}</p> <p class="mt-1 text-sm text-[color:var(--color-muted)]">${order.item.title}</p> <p class="mt-1 text-xs text-[color:var(--color-muted)]">${formatDateIndo(order.createdAt)}</p> </td> <td class="px-5 py-4"> <p class="font-medium text-[color:var(--color-body)]">${order.customer.name}</p> <p class="mt-1 text-sm text-[color:var(--color-muted)]">${order.customer.phone}</p> <p class="mt-1 text-sm text-[color:var(--color-muted)]"> ${order.customer.city}, ${order.customer.state} </p> </td> <td class="px-5 py-4 text-sm font-semibold text-[color:var(--color-body)]"> ${formatCurrency(order.payment.amountDueNow)} </td> <td class="px-5 py-4"> ${renderComponent($$result2, "OrderStatusPill", $$OrderStatusPill, { "status": order.status })} </td> <td class="px-5 py-4"> <a${addAttribute(`/admin/pesanan/${order.orderCode}/`, "href")} class="text-sm font-semibold text-[color:var(--color-wood-deep)] underline underline-offset-4">
Lihat detail
</a> </td> </tr>`)} </tbody> </table> </div> </div> </section> ` })}`;
}, "E:/Gallery Jepara/src/pages/admin/pesanan/index.astro", void 0);

const $$file = "E:/Gallery Jepara/src/pages/admin/pesanan/index.astro";
const $$url = "/admin/pesanan/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
