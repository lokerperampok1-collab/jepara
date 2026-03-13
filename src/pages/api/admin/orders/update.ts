import type { APIRoute } from "astro";
import { updateOrderByAdmin } from "@/server/orders";

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const orderCode = String(formData.get("orderCode") ?? "").trim();

  try {
    await updateOrderByAdmin(formData);

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/admin/pesanan/${orderCode}/?success=${encodeURIComponent("Status pesanan berhasil diperbarui.")}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Pesanan gagal diperbarui.";

    return new Response(null, {
      status: 303,
      headers: {
        Location: `/admin/pesanan/${orderCode}/?error=${encodeURIComponent(message)}`,
      },
    });
  }
};
