import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { J as renderTemplate, v as maybeRenderHead, a0 as addAttribute } from './sequence_7oStfiHe.mjs';
import { r as renderComponent } from './server_CSOThi1w.mjs';
import { $ as $$OrderStatusPill } from './OrderStatusPill_b6KXDYKb.mjs';
import { $ as $$BaseLayout, f as formatCurrency, a as formatDateIndo } from './BaseLayout_B8K3cQ30.mjs';
import { g as getOrderByCode, a as getOrderStatusLabel } from './orders_DAL7ycbv.mjs';

const prerender = false;
const $$orderCode = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$orderCode;
  const orderCode = Astro2.params.orderCode ?? "";
  const order = await getOrderByCode(orderCode);
  const successMessage = Astro2.url.searchParams.get("success");
  const errorMessage = Astro2.url.searchParams.get("error");
  const statuses = [
    "awaiting_payment",
    "awaiting_verification",
    "dp_received",
    "paid",
    "processing",
    "ready_to_ship",
    "shipped",
    "completed",
    "cancelled"
  ];
  if (!order) {
    Astro2.response.status = 404;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": order ? `Admin ${order.orderCode}` : "Order tidak ditemukan", "description": "Kelola status order, pembayaran, dan pengiriman di dashboard admin.", "canonicalPath": order ? `/admin/pesanan/${order.orderCode}/` : "/admin/pesanan/" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container-shell pb-12 pt-12"> ${order ? renderTemplate`<div class="space-y-8"> <div class="flex flex-wrap items-start justify-between gap-4"> <div> <a href="/admin/pesanan/" class="text-sm font-semibold text-[color:var(--color-wood-deep)] underline underline-offset-4">
Kembali ke daftar pesanan
</a> <h1 class="serif-display mt-3 text-3xl font-semibold text-[color:var(--color-ink)]">${order.orderCode}</h1> <p class="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">${order.item.title}</p> </div> ${renderComponent($$result2, "OrderStatusPill", $$OrderStatusPill, { "status": order.status })} </div> ${successMessage && renderTemplate`<div class="notice-success">${successMessage}</div>`} ${errorMessage && renderTemplate`<div class="notice-error">${errorMessage}</div>`} <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]"> <div class="space-y-8"> <section class="surface-card rounded-[2rem] p-6 sm:p-7"> <h2 class="serif-display text-2xl font-semibold text-[color:var(--color-ink)]">Detail Pembeli</h2> <dl class="mt-6 space-y-4 text-sm leading-7 text-[color:var(--color-muted)]"> <div> <dt class="text-xs uppercase tracking-[0.18em]">Nama</dt> <dd class="mt-1 font-semibold text-[color:var(--color-body)]">${order.customer.name}</dd> </div> <div> <dt class="text-xs uppercase tracking-[0.18em]">Kontak</dt> <dd class="mt-1">${order.customer.phone}${order.customer.email ? ` | ${order.customer.email}` : ""}</dd> </div> <div> <dt class="text-xs uppercase tracking-[0.18em]">Alamat</dt> <dd class="mt-1"> ${order.customer.address}, ${order.customer.city}, ${order.customer.state} ${order.customer.postcode}, ${order.customer.country} </dd> </div> <div> <dt class="text-xs uppercase tracking-[0.18em]">Skema bayar</dt> <dd class="mt-1"> ${order.payment.type === "dp" ? `DP ${order.payment.dpPercentage}%` : "Bayar penuh"} | ${formatCurrency(order.payment.amountDueNow)} </dd> </div> ${order.payment.remainingAmount ? renderTemplate`<div> <dt class="text-xs uppercase tracking-[0.18em]">Sisa pelunasan</dt> <dd class="mt-1">${formatCurrency(order.payment.remainingAmount)}</dd> </div>` : null} ${order.notes && renderTemplate`<div> <dt class="text-xs uppercase tracking-[0.18em]">Catatan customer</dt> <dd class="mt-1">${order.notes}</dd> </div>`} </dl> </section> <section class="surface-card rounded-[2rem] p-6 sm:p-7"> <h2 class="serif-display text-2xl font-semibold text-[color:var(--color-ink)]">Konfirmasi Pembayaran</h2> ${order.paymentConfirmations.length > 0 ? renderTemplate`<div class="mt-6 space-y-4"> ${order.paymentConfirmations.map((confirmation) => renderTemplate`<article class="rounded-[1.3rem] border border-[color:var(--color-border)] bg-white/80 p-4"> <div class="flex flex-wrap items-center justify-between gap-3"> <p class="font-semibold text-[color:var(--color-body)]">${confirmation.payerName}</p> <p class="text-sm text-[color:var(--color-muted)]">${formatDateIndo(confirmation.createdAt)}</p> </div> <p class="mt-2 text-sm leading-7 text-[color:var(--color-muted)]"> ${confirmation.payerBank} ${confirmation.amountPaid ? ` | ${formatCurrency(confirmation.amountPaid)}` : ""} </p> ${confirmation.notes && renderTemplate`<p class="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">${confirmation.notes}</p>`} ${confirmation.proofFileName && renderTemplate`<a${addAttribute(`/api/admin/proofs/${confirmation.proofFileName}/`, "href")} target="_blank" rel="noreferrer" class="mt-3 inline-flex text-sm font-semibold text-[color:var(--color-wood-deep)] underline underline-offset-4">
Lihat bukti bayar
</a>`} </article>`)} </div>` : renderTemplate`<p class="mt-5 text-sm leading-7 text-[color:var(--color-muted)]">
Belum ada bukti pembayaran yang dikirim customer.
</p>`} </section> </div> <section class="surface-card rounded-[2rem] p-6 sm:p-7"> <h2 class="serif-display text-2xl font-semibold text-[color:var(--color-ink)]">Update Status & Resi</h2> <form action="/api/admin/orders/update/" method="post" class="mt-6 space-y-5"> <input type="hidden" name="orderCode"${addAttribute(order.orderCode, "value")}> <label class="form-field"> <span>Status pesanan</span> <select name="status"> ${statuses.map((status) => renderTemplate`<option${addAttribute(status, "value")}${addAttribute(order.status === status, "selected")}>${getOrderStatusLabel(status)}</option>`)} </select> </label> <label class="form-field"> <span>Catatan admin</span> <textarea name="adminNotes" rows="5" placeholder="Catatan internal untuk stok, finishing, atau pengiriman.">${order.adminNotes}</textarea> </label> <div class="grid gap-5 sm:grid-cols-2"> <label class="form-field"> <span>Nama kurir / ekspedisi</span> <input name="courierName" type="text"${addAttribute(order.courierName, "value")} placeholder="Contoh: cargo laut, J&T, DHL"> </label> <label class="form-field"> <span>Nomor resi</span> <input name="trackingNumber" type="text"${addAttribute(order.trackingNumber, "value")} placeholder="Masukkan nomor tracking"> </label> </div> <label class="form-field"> <span>Link tracking</span> <input name="trackingUrl" type="url"${addAttribute(order.trackingUrl, "value")} placeholder="https://..."> </label> <button type="submit" class="btn-primary">Simpan pembaruan</button> </form> </section> </div> </div>` : renderTemplate`<div class="surface-card rounded-[2rem] p-8 text-center"> <h1 class="serif-display text-3xl font-semibold text-[color:var(--color-ink)]">Order tidak ditemukan</h1> </div>`} </section> ` })}`;
}, "E:/Gallery Jepara/src/pages/admin/pesanan/[orderCode].astro", void 0);

const $$file = "E:/Gallery Jepara/src/pages/admin/pesanan/[orderCode].astro";
const $$url = "/admin/pesanan/[orderCode]/";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$orderCode,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
