import { d as createOrderFromForm } from './orders_DAL7ycbv.mjs';

const POST = async ({ request }) => {
  const formData = await request.formData();
  const productSlug = String(formData.get("productSlug") ?? "").trim();
  try {
    const order = await createOrderFromForm(formData);
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${order.orderCode}/`
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pesanan tidak bisa diproses.";
    return new Response(null, {
      status: 303,
      headers: {
        Location: productSlug ? `/checkout/${productSlug}/?error=${encodeURIComponent(message)}` : `/cek-pesanan/?error=${encodeURIComponent(message)}`
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
