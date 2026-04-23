import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { CartLine } from "@/lib/cart";
import type { PaymentMethod } from "@/lib/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateRef(): string {
  return `W-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string;
      table: string;
      payment: PaymentMethod;
      lines: CartLine[];
      subtotal: number;
    };

    const { name, table, payment, lines, subtotal } = body;

    if (!name?.trim() || !table?.trim() || !payment || !lines?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = generateRef();

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ reference, name: name.trim(), table_number: table.trim(), payment, subtotal })
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert items
    const items = lines.map((l) => ({
      order_id: order.id,
      item_id: l.itemId,
      name: l.name,
      quantity: l.quantity,
      unit_price: l.unitPrice,
      options: l.options ?? [],
      note: l.note ?? null,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(items);
    if (itemsError) throw itemsError;

    return NextResponse.json({ reference, orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error("[orders] POST error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
