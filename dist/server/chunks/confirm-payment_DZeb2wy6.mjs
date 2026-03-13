import { c as addPaymentConfirmation } from './orders_Bqi7bjkL.mjs';

const POST = async ({ request }) => {
  const formData = await request.formData();
  const orderCode = String(formData.get("orderCode") ?? "").trim();
  try {
    const order = await addPaymentConfirmation(formData);
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${order.orderCode}/?success=${encodeURIComponent("Konfirmasi pembayaran berhasil dikirim.")}`
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Konfirmasi pembayaran gagal dikirim.";
    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${orderCode}/?error=${encodeURIComponent(message)}`
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
