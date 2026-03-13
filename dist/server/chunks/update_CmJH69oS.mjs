import { u as updateOrderByAdmin } from './orders_Bqi7bjkL.mjs';

const POST = async ({ request }) => {
  const formData = await request.formData();
  const orderCode = String(formData.get("orderCode") ?? "").trim();
  try {
    await updateOrderByAdmin(formData);
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/admin/pesanan/${orderCode}/?success=${encodeURIComponent("Status pesanan berhasil diperbarui.")}`
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pesanan gagal diperbarui.";
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/admin/pesanan/${orderCode}/?error=${encodeURIComponent(message)}`
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
