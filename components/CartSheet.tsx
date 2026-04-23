"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import Sheet from "./Sheet";
import { formatPrice, useCart } from "@/lib/cart";

export default function CartSheet({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { lines, setQuantity, remove, subtotal, count } = useCart();

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Your order"
      footer={
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-espresso/50">Subtotal</div>
              <div className="text-[11.5px] text-espresso/45 mt-0.5">
                {count} item{count > 1 ? "s" : ""} · service included
              </div>
            </div>
            <div className="font-serif text-[28px] tabular-nums">{formatPrice(subtotal)}</div>
          </div>
          <button
            disabled={count === 0}
            onClick={onCheckout}
            className="w-full h-13 h-[52px] rounded-full bg-espresso text-cream font-medium text-[14px] tracking-wide flex items-center justify-center active:scale-[0.99] transition disabled:opacity-40"
          >
            Continue to checkout
          </button>
        </div>
      }
    >
      <div className="px-5 pb-6">
        {lines.length === 0 ? (
          <div className="text-center py-14 text-espresso/50 text-[14px]">Your cart is empty.</div>
        ) : (
          <ul className="divide-y divide-espresso/8">
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.li
                  key={line.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-[15px] font-medium text-espresso truncate">{line.name}</h3>
                        <span className="text-[14px] font-semibold tabular-nums">
                          {formatPrice(line.unitPrice * line.quantity)}
                        </span>
                      </div>
                      {line.options && line.options.length > 0 && (
                        <p className="mt-1 text-[12px] text-espresso/55 leading-relaxed">
                          {line.options.map((o) => o.value).join(" · ")}
                        </p>
                      )}
                      {line.note && (
                        <p className="mt-1 text-[12px] italic text-espresso/50">"{line.note}"</p>
                      )}

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center h-9 rounded-full bg-espresso/6">
                          <button
                            onClick={() => setQuantity(line.id, line.quantity - 1)}
                            className="h-9 w-9 rounded-full flex items-center justify-center text-espresso/70 active:scale-95"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-[13px] font-semibold tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(line.id, line.quantity + 1)}
                            className="h-9 w-9 rounded-full flex items-center justify-center text-espresso/70 active:scale-95"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => remove(line.id)}
                          className="h-9 w-9 rounded-full flex items-center justify-center text-espresso/40 hover:text-red-500 active:scale-95 transition"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </Sheet>
  );
}
