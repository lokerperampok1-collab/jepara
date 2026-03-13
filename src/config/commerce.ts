export type ManualPaymentMethod = "bank-transfer" | "qris";

export interface ManualPaymentChannelConfig {
  id: ManualPaymentMethod;
  label: string;
  description: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  qrisImagePath?: string;
}

export const ORDER_DEFAULT_COUNTRY = "Malaysia";
export const ORDER_PAYMENT_WINDOW_HOURS = 24;
export const DP_HIGH_VALUE_PERCENTAGE = 50;
export const DP_STANDARD_PERCENTAGE = 30;
export const FULL_PAYMENT_MAX_PRICE = 800_000;
export const HIGH_VALUE_PRICE_THRESHOLD = 2_000_000;

export const MANUAL_PAYMENT_CHANNELS: ManualPaymentChannelConfig[] = [
  {
    id: "bank-transfer",
    label: "Transfer Bank",
    description: "Transfer ke rekening resmi Gallery Furnicraft Jepara sesuai nominal tagihan.",
    accountName: import.meta.env.BANK_ACCOUNT_NAME ?? "",
    bankName: import.meta.env.BANK_NAME ?? "",
    accountNumber: import.meta.env.BANK_ACCOUNT_NUMBER ?? "",
  },
  {
    id: "qris",
    label: "QRIS",
    description: "Bayar lewat QRIS dari mobile banking atau e-wallet setelah nominal pesanan dikonfirmasi.",
    qrisImagePath: import.meta.env.QRIS_IMAGE_PATH ?? "",
  },
];

export const ORDER_ADMIN_USERNAME = import.meta.env.ORDER_ADMIN_USERNAME ?? "admin";
export const ORDER_ADMIN_PASSWORD = import.meta.env.ORDER_ADMIN_PASSWORD ?? "";
