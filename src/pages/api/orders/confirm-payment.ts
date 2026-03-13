import type { APIRoute } from "astro";
import { addPaymentConfirmation } from "@/server/orders";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const orderCode = String(formData.get("orderCode") ?? "").trim();

  try {
    const order = await addPaymentConfirmation(formData);

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${order.orderCode}/?success=${encodeURIComponent("Konfirmasi pembayaran berhasil dikirim.")}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Konfirmasi pembayaran gagal dikirim.";

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${orderCode}/?error=${encodeURIComponent(message)}`,
      },
    });
  }
};
