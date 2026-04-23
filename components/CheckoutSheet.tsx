"use client";
import { useState } from "react";
import clsx from "clsx";
import { Apple, CreditCard, Store, Check } from "lucide-react";
import Sheet from "./Sheet";
import { formatPrice, useCart } from "@/lib/cart";

type PaymentMethod = "apple" | "card" | "counter";

export default function CheckoutSheet({
  open,
  onClose,
  initialTable,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  initialTable?: string;
  onSuccess: (ref: string) => void;
}) {
  const { subtotal, lines, clear } = useCart();
  const [name, setName] = useState("");
  const [table, setTable] = useState(initialTable ?? "");
  const [payment, setPayment] = useState<PaymentMethod>("apple");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = name.trim().length >= 2 && table.trim().length >= 1 && lines.length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, table, payment, lines, subtotal }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { reference } = await res.json();
      clear();
      onSuccess(reference);
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Checkout"
      footer={
        <button
          disabled={!canSubmit || submitting}
          onClick={handleSubmit}
          className="w-full h-[52px] rounded-full bg-espresso text-cream font-medium text-[14px] tracking-wide flex items-center justify-between px-5 active:scale-[0.99] transition disabled:opacity-40"
        >
          <span>{submitting ? "Sending…" : "Confirm order"}</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </button>
      }
    >
      <div className="px-5 pb-6 space-y-6">
        <Field label="Your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah"
            className="w-full h-12 rounded-2xl bg-espresso/5 border border-espresso/8 px-4 text-[14px] placeholder:text-espresso/35 focus:outline-none focus:border-espresso/30 transition"
          />
        </Field>

        <Field label="Table number">
          <input
            value={table}
            onChange={(e) => setTable(e.target.value.replace(/[^0-9]/g, "").slice(0, 3))}
            placeholder="12"
            inputMode="numeric"
            className="w-full h-12 rounded-2xl bg-espresso/5 border border-espresso/8 px-4 text-[14px] placeholder:text-espresso/35 focus:outline-none focus:border-espresso/30 transition"
          />
        </Field>

        <div>
          <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-espresso/45 mb-2">
            Payment
          </div>
          <div className="space-y-2">
            <PaymentOption
              active={payment === "apple"}
              onClick={() => setPayment("apple")}
              icon={<Apple className="h-4 w-4" />}
              title="Apple Pay"
              subtitle="Fast, secure checkout"
            />
            <PaymentOption
              active={payment === "card"}
              onClick={() => setPayment("card")}
              icon={<CreditCard className="h-4 w-4" />}
              title="Credit / Debit card"
              subtitle="Visa, Mastercard, Amex"
            />
            <PaymentOption
              active={payment === "counter"}
              onClick={() => setPayment("counter")}
              icon={<Store className="h-4 w-4" />}
              title="Pay at the counter"
              subtitle="Show your order reference"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-espresso/4 border border-espresso/6 p-4">
          <div className="flex items-baseline justify-between text-[13px]">
            <span className="text-espresso/60">Subtotal</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-baseline justify-between text-[13px] mt-1">
            <span className="text-espresso/60">Service</span>
            <span className="text-espresso/60">Included</span>
          </div>
          <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-espresso/8">
            <span className="text-[14px] font-semibold">Total</span>
            <span className="font-serif text-[22px] tabular-nums">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-espresso/45 mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-full h-16 rounded-2xl border px-4 flex items-center gap-3 text-left transition active:scale-[0.99]",
        active ? "bg-espresso text-cream border-espresso shadow-soft" : "bg-cream border-espresso/10 text-espresso"
      )}
    >
      <div
        className={clsx(
          "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
          active ? "bg-cream/15" : "bg-espresso/5"
        )}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium">{title}</div>
        <div className={clsx("text-[12px] mt-0.5", active ? "text-cream/70" : "text-espresso/50")}>{subtitle}</div>
      </div>
      <div
        className={clsx(
          "h-5 w-5 rounded-full flex items-center justify-center border-2 transition",
          active ? "bg-cream border-cream" : "border-espresso/20"
        )}
      >
        {active && <Check className="h-3 w-3 text-espresso" strokeWidth={3} />}
      </div>
    </button>
  );
}
