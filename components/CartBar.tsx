"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatPrice, useCart } from "@/lib/cart";

export default function CartBar({ onOpen }: { onOpen: () => void }) {
  const { count, subtotal } = useCart();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-30 safe-bottom pointer-events-none"
        >
          <div className="mx-auto max-w-[520px] px-4 pb-4 pt-2 pointer-events-auto">
            <button
              onClick={onOpen}
              className="w-full h-14 rounded-full bg-espresso text-cream flex items-center justify-between pl-4 pr-5 shadow-lift active:scale-[0.99] transition"
            >
              <span className="flex items-center gap-3">
                <span className="relative h-9 w-9 rounded-full bg-cream/10 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4" />
                  <motion.span
                    key={count}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-wayne text-[11px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                </span>
                <span className="text-[14px] font-medium tracking-wide">View order</span>
              </span>
              <span className="text-[14px] font-semibold tabular-nums">{formatPrice(subtotal)}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
