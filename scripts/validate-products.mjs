import fs from "node:fs";
import path from "node:path";

const filePath = path.resolve("products.json");
const raw = fs.readFileSync(filePath, "utf8");
const data = JSON.parse(raw);

if (!Array.isArray(data)) {
  throw new Error("products.json harus berupa array.");
}

if (data.length === 0) {
  throw new Error("products.json kosong.");
}

const requiredKeys = [
  "id",
  "slug",
  "title",
  "sourceLink",
  "date",
  "modified",
  "categories",
  "excerpt",
  "description",
  "images",
  "featuredImage",
  "waPhone",
  "priceRaw",
  "priceValue",
  "priceFormatted",
  "regularPriceValue",
  "salePriceValue",
  "categoryLabels",
];

data.forEach((product, index) => {
  for (const key of requiredKeys) {
    if (!(key in product)) {
      throw new Error(`Produk index ${index} tidak memiliki field wajib: ${key}`);
    }
  }
});

console.log(`Validated ${data.length} products from products.json`);
