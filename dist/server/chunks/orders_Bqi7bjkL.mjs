import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { a as getProductBySlug } from './catalog_BdPK18__.mjs';

const ORDER_PAYMENT_WINDOW_HOURS = 24;
const DP_HIGH_VALUE_PERCENTAGE = 50;
const DP_STANDARD_PERCENTAGE = 30;
const FULL_PAYMENT_MAX_PRICE = 8e5;
const HIGH_VALUE_PRICE_THRESHOLD = 2e6;
const MANUAL_PAYMENT_CHANNELS = [
  {
    id: "bank-transfer",
    label: "Transfer Bank BRI",
    description: "Transfer ke rekening BRI sesuai nominal tagihan yang tertera di halaman pesanan.",
    accountName: "",
    bankName: "BRI",
    accountNumber: ""
  }
];

const storageDir = path.join(process.cwd(), "storage");
const proofsDir = path.join(storageDir, "payment-proofs");
const ordersFile = path.join(storageDir, "orders.json");
let writeQueue = Promise.resolve();
function createDefaultStore() {
  return { orders: [] };
}
async function ensureStorage() {
  await mkdir(storageDir, { recursive: true });
  await mkdir(proofsDir, { recursive: true });
  try {
    await readFile(ordersFile, "utf8");
  } catch {
    await writeFile(ordersFile, JSON.stringify(createDefaultStore(), null, 2), "utf8");
  }
}
async function readStore() {
  await ensureStorage();
  const raw = await readFile(ordersFile, "utf8");
  return JSON.parse(raw) ?? createDefaultStore();
}
async function writeStore(store) {
  await ensureStorage();
  await writeFile(ordersFile, JSON.stringify(store, null, 2), "utf8");
}
async function mutateStore(mutator) {
  let result;
  writeQueue = writeQueue.then(async () => {
    const store = await readStore();
    result = await mutator(store);
    await writeStore(store);
  });
  await writeQueue;
  return result;
}
function randomId(length = 8) {
  return Math.random().toString(36).slice(2, 2 + length).toUpperCase();
}
function buildOrderCode() {
  const now = /* @__PURE__ */ new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `GFJ-${y}${m}${d}-${randomId(4)}`;
}
function roundCurrency(value) {
  return Math.round(value);
}
function getRecommendedDpPercentage(product) {
  if (!product.priceValue) {
    return DP_HIGH_VALUE_PERCENTAGE;
  }
  if (product.status === "pre-order" || product.status === "open-order") {
    return DP_HIGH_VALUE_PERCENTAGE;
  }
  if (product.priceValue <= FULL_PAYMENT_MAX_PRICE) {
    return 0;
  }
  if (product.priceValue >= HIGH_VALUE_PRICE_THRESHOLD) {
    return DP_HIGH_VALUE_PERCENTAGE;
  }
  return DP_STANDARD_PERCENTAGE;
}
function buildPaymentBreakdown(product, paymentType, paymentMethod, quantity = 1) {
  const fullAmount = typeof product.priceValue === "number" ? product.priceValue * Math.max(1, quantity) : null;
  const recommendedDp = getRecommendedDpPercentage(product);
  const dpPercentage = paymentType === "dp" ? recommendedDp || DP_STANDARD_PERCENTAGE : 0;
  if (typeof fullAmount !== "number") {
    return {
      type: paymentType,
      dpPercentage,
      fullAmount: null,
      amountDueNow: null,
      remainingAmount: null,
      paymentMethod
    };
  }
  const amountDueNow = paymentType === "dp" ? roundCurrency(fullAmount * dpPercentage / 100) : fullAmount;
  const remainingAmount = paymentType === "dp" ? Math.max(0, fullAmount - amountDueNow) : 0;
  return {
    type: paymentType,
    dpPercentage,
    fullAmount,
    amountDueNow,
    remainingAmount,
    paymentMethod
  };
}
function normalizeText(value) {
  return String(value ?? "").trim();
}
function normalizeNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(normalizeText(value));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
function getOrderStatusLabel(status) {
  const labels = {
    awaiting_payment: "Menunggu Pembayaran",
    awaiting_verification: "Menunggu Verifikasi",
    dp_received: "DP Diterima",
    paid: "Lunas",
    processing: "Diproses",
    ready_to_ship: "Siap Dikirim",
    shipped: "Dikirim",
    completed: "Selesai",
    cancelled: "Dibatalkan"
  };
  return labels[status];
}
async function listOrders() {
  const store = await readStore();
  return [...store.orders].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}
async function getOrderByCode(orderCode) {
  const store = await readStore();
  return store.orders.find((order) => order.orderCode.toLowerCase() === orderCode.trim().toLowerCase()) ?? null;
}
async function createOrderFromForm(formData) {
  const productSlug = normalizeText(formData.get("productSlug"));
  const product = getProductBySlug(productSlug);
  if (!product) {
    throw new Error("Produk tidak ditemukan.");
  }
  const quantity = Math.max(1, Math.round(normalizeNumber(formData.get("quantity"), 1)));
  const paymentType = normalizeText(formData.get("paymentType")) === "dp" ? "dp" : "full";
  const paymentMethod = "bank-transfer";
  const payment = buildPaymentBreakdown(product, paymentType, paymentMethod, quantity);
  const customer = {
    name: normalizeText(formData.get("customerName")),
    phone: normalizeText(formData.get("customerPhone")),
    email: normalizeText(formData.get("customerEmail")),
    country: normalizeText(formData.get("country")),
    state: normalizeText(formData.get("state")),
    city: normalizeText(formData.get("city")),
    postcode: normalizeText(formData.get("postcode")),
    address: normalizeText(formData.get("address"))
  };
  if (!customer.name || !customer.phone || !customer.country || !customer.state || !customer.city || !customer.address) {
    throw new Error("Lengkapi data pembeli dan alamat terlebih dahulu.");
  }
  const now = /* @__PURE__ */ new Date();
  const order = {
    id: crypto.randomUUID(),
    orderCode: buildOrderCode(),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + ORDER_PAYMENT_WINDOW_HOURS * 60 * 60 * 1e3).toISOString(),
    status: "awaiting_payment",
    item: {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      priceValue: product.priceValue,
      priceFormatted: product.priceFormatted,
      featuredImage: product.featuredImage
    },
    quantity,
    customer,
    notes: normalizeText(formData.get("notes")),
    payment,
    adminNotes: "",
    courierName: "",
    trackingNumber: "",
    trackingUrl: "",
    shippedAt: null,
    paymentConfirmations: []
  };
  const createdOrder = await mutateStore((store) => {
    store.orders.unshift(order);
    return order;
  });
  return createdOrder;
}
async function addPaymentConfirmation(formData) {
  const orderCode = normalizeText(formData.get("orderCode"));
  const file = formData.get("proofFile");
  return mutateStore(async (store) => {
    const order = store.orders.find((entry) => entry.orderCode.toLowerCase() === orderCode.toLowerCase());
    if (!order) {
      throw new Error("Pesanan tidak ditemukan.");
    }
    let proofFileName = null;
    let proofOriginalName = null;
    if (file instanceof File && file.size > 0) {
      const ext = path.extname(file.name) || ".bin";
      proofFileName = `${order.orderCode.toLowerCase()}-${Date.now()}${ext}`;
      proofOriginalName = file.name;
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(proofsDir, proofFileName), buffer);
    }
    const confirmation = {
      id: crypto.randomUUID(),
      payerName: normalizeText(formData.get("payerName")),
      payerBank: normalizeText(formData.get("payerBank")),
      amountPaid: normalizeNumber(formData.get("amountPaid")) || null,
      paidAt: normalizeText(formData.get("paidAt")) || (/* @__PURE__ */ new Date()).toISOString(),
      notes: normalizeText(formData.get("paymentNotes")),
      proofFileName,
      proofOriginalName,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (!confirmation.payerName || !confirmation.payerBank) {
      throw new Error("Lengkapi data pembayaran sebelum mengirim konfirmasi.");
    }
    order.paymentConfirmations.unshift(confirmation);
    order.status = "awaiting_verification";
    order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    return order;
  });
}
async function updateOrderByAdmin(formData) {
  const orderCode = normalizeText(formData.get("orderCode"));
  const nextStatus = normalizeText(formData.get("status"));
  return mutateStore((store) => {
    const order = store.orders.find((entry) => entry.orderCode.toLowerCase() === orderCode.toLowerCase());
    if (!order) {
      throw new Error("Pesanan tidak ditemukan.");
    }
    order.status = nextStatus || order.status;
    order.adminNotes = normalizeText(formData.get("adminNotes"));
    order.courierName = normalizeText(formData.get("courierName"));
    order.trackingNumber = normalizeText(formData.get("trackingNumber"));
    order.trackingUrl = normalizeText(formData.get("trackingUrl"));
    order.shippedAt = order.status === "shipped" || order.status === "completed" ? order.shippedAt || (/* @__PURE__ */ new Date()).toISOString() : order.shippedAt;
    order.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    return order;
  });
}
function getProofFilePath(fileName) {
  return path.join(proofsDir, fileName);
}

export { MANUAL_PAYMENT_CHANNELS as M, ORDER_PAYMENT_WINDOW_HOURS as O, getOrderStatusLabel as a, getProofFilePath as b, addPaymentConfirmation as c, createOrderFromForm as d, getOrderByCode as g, listOrders as l, updateOrderByAdmin as u };
