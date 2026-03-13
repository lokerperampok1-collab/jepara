export type ManualPaymentMethod = "bank-transfer";

export interface ManualPaymentChannelConfig {
  id: ManualPaymentMethod;
  label: string;
  description: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
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
    label: "Transfer Bank BRI",
    description: "Transfer ke rekening BRI sesuai nominal tagihan yang tertera di halaman pesanan.",
    accountName: import.meta.env.BANK_ACCOUNT_NAME ?? "",
    bankName: import.meta.env.BANK_NAME ?? "BRI",
    accountNumber: import.meta.env.BANK_ACCOUNT_NUMBER ?? "",
  },
];

export const ORDER_ADMIN_USERNAME = import.meta.env.ORDER_ADMIN_USERNAME ?? "admin";
export const ORDER_ADMIN_PASSWORD = import.meta.env.ORDER_ADMIN_PASSWORD ?? "";
