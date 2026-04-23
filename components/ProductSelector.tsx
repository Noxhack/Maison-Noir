"use client";
import { motion } from "framer-motion";
import { Drink } from "@/lib/data";
import clsx from "clsx";

type Props = {
  drinks: Drink[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function ProductSelector({ drinks, selectedId, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-1">
      {drinks.map((d) => {
        const active = d.id === selectedId;
        return (
          <motion.button
            key={d.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(d.id)}
            className={clsx(
              "relative shrink-0 rounded-full px-5 py-3 text-sm transition-colors border min-h-[44px]",
              active ? "text-cream border-espresso" : "text-mocha/80 border-mocha/20 bg-cream hover:border-mocha/40"
            )}
          >
            {active && (
              <motion.span
                layoutId="product-pill"
                className="absolute inset-0 rounded-full bg-espresso shadow-premium"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {d.name}
              <span className={clsx("text-[11px] tabular-nums", active ? "text-cream/70" : "text-mocha/50")}>
                {d.price.toFixed(2)}€
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
