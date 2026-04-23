import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-03-25.dahlia" as const,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, orderId } = await req.json() as { amount: number; orderId?: string };

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: { orderId: orderId ?? "" },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[stripe] error:", err);
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}
