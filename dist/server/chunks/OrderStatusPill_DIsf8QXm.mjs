import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { v as maybeRenderHead, a0 as addAttribute, J as renderTemplate } from './sequence_7oStfiHe.mjs';
import 'clsx';
import { a as getOrderStatusLabel } from './orders_Bqi7bjkL.mjs';

const $$OrderStatusPill = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OrderStatusPill;
  const { status } = Astro2.props;
  const toneClass = status === "paid" || status === "completed" ? "bg-emerald-100 text-emerald-800" : status === "awaiting_verification" || status === "dp_received" ? "bg-amber-100 text-amber-800" : status === "cancelled" ? "bg-rose-100 text-rose-800" : "bg-slate-100 text-slate-800";
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["inline-flex rounded-full px-3 py-1 text-xs font-semibold", toneClass], "class:list")}> ${getOrderStatusLabel(status)} </span>`;
}, "E:/Gallery Jepara/src/components/OrderStatusPill.astro", void 0);

export { $$OrderStatusPill as $ };
