import type { ManualPaymentMethod } from "@/config/commerce";

export type OrderPaymentType = "dp" | "full";

export type OrderStatus =
  | "awaiting_payment"
  | "awaiting_verification"
  | "dp_received"
  | "paid"
  | "processing"
  | "ready_to_ship"
  | "shipped"
  | "completed"
  | "cancelled";

export interface OrderItemSnapshot {
  productId: number;
  slug: string;
  title: string;
  priceValue: number | null;
  priceFormatted: string | null;
  featuredImage: string | null;
}

export interface OrderPaymentBreakdown {
  type: OrderPaymentType;
  dpPercentage: number;
  fullAmount: number | null;
  amountDueNow: number | null;
  remainingAmount: number | null;
  paymentMethod: ManualPaymentMethod;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  postcode: string;
  address: string;
}

export interface PaymentConfirmationRecord {
  id: string;
  payerName: string;
  payerBank: string;
  amountPaid: number | null;
  paidAt: string;
  notes: string;
  proofFileName: string | null;
  proofOriginalName: string | null;
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  orderCode: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  status: OrderStatus;
  item: OrderItemSnapshot;
  quantity: number;
  customer: OrderCustomer;
  notes: string;
  payment: OrderPaymentBreakdown;
  adminNotes: string;
  courierName: string;
  trackingNumber: string;
  trackingUrl: string;
  shippedAt: string | null;
  paymentConfirmations: PaymentConfirmationRecord[];
}

export interface OrderStore {
  orders: OrderRecord[];
}
