import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { getProofFilePath } from "@/server/orders";

export const GET: APIRoute = async ({ params }) => {
  const fileName = params.fileName;

  if (!fileName) {
    return new Response("File tidak ditemukan.", { status: 404 });
  }

  try {
    const filePath = getProofFilePath(fileName);
    const content = await readFile(filePath);
    const lowerName = fileName.toLowerCase();
    const contentType = lowerName.endsWith(".png")
      ? "image/png"
      : lowerName.endsWith(".webp")
        ? "image/webp"
        : lowerName.endsWith(".pdf")
          ? "application/pdf"
          : "image/jpeg";

    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch {
    return new Response("File tidak ditemukan.", { status: 404 });
  }
};
