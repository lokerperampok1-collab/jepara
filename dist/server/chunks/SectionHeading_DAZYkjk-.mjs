import { c as createComponent } from './astro-component_bl35EZqZ.mjs';
import 'piccolore';
import { v as maybeRenderHead, a0 as addAttribute, J as renderTemplate } from './sequence_7oStfiHe.mjs';
import 'clsx';

const $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SectionHeading;
  const {
    eyebrow,
    title,
    description,
    align = "left"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["max-w-2xl", align === "center" ? "mx-auto text-center" : ""], "class:list")}> ${eyebrow && renderTemplate`<p class="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-wood-deep)]"> ${eyebrow} </p>`} <h2 class="serif-display mt-3 text-2xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-3xl"> ${title} </h2> ${description && renderTemplate`<p class="mt-3 text-[0.98rem] leading-7 text-[color:var(--color-muted)]">${description}</p>`} </div>`;
}, "E:/Gallery Jepara/src/components/SectionHeading.astro", void 0);

export { $$SectionHeading as $ };
