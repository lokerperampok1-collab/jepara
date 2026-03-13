import { readFile } from 'node:fs/promises';
import { b as getProofFilePath } from './orders_Bqi7bjkL.mjs';

const GET = async ({ params }) => {
  const fileName = params.fileName;
  if (!fileName) {
    return new Response("File tidak ditemukan.", { status: 404 });
  }
  try {
    const filePath = getProofFilePath(fileName);
    const content = await readFile(filePath);
    const lowerName = fileName.toLowerCase();
    const contentType = lowerName.endsWith(".png") ? "image/png" : lowerName.endsWith(".webp") ? "image/webp" : lowerName.endsWith(".pdf") ? "application/pdf" : "image/jpeg";
    return new Response(content, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=300"
      }
    });
  } catch {
    return new Response("File tidak ditemukan.", { status: 404 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
