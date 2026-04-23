import { createClient } from "@supabase/supabase-js";

export type OrderStatus = "pending" | "preparing" | "ready" | "done";
export type PaymentMethod = "apple" | "card" | "counter";

export type Order = {
  id: string;
  reference: string;
  name: string;
  table_number: string;
  payment: PaymentMethod;
  status: OrderStatus;
  subtotal: number;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  item_id: string;
  name: string;
  quantity: number;
  unit_price: number;
  options: { label: string; value: string }[];
  note?: string;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);
