import type { APIRoute } from "astro";
import { createOrderFromForm } from "@/server/orders";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const productSlug = String(formData.get("productSlug") ?? "").trim();

  try {
    const order = await createOrderFromForm(formData);

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/pesanan/${order.orderCode}/`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pesanan tidak bisa diproses.";

    return new Response(null, {
      status: 303,
      headers: {
        Location: productSlug
          ? `/checkout/${productSlug}/?error=${encodeURIComponent(message)}`
          : `/cek-pesanan/?error=${encodeURIComponent(message)}`,
      },
    });
  }
};
