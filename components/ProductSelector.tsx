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
    <div className="flex gap-3 overflow-x-auto hide-scrollbar px-1 py-2 snap-x snap-mandatory">
      {drinks.map((d) => {
        const active = d.id === selectedId;

        return (
          <motion.button
            key={d.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => onSelect(d.id)}
            className={clsx(
              "relative shrink-0 snap-start rounded-full px-5 py-3 text-sm min-h-[48px] flex items-center justify-center border transition-all",
              active
                ? "text-white border-black"
                : "text-mocha/80 border-mocha/20 bg-white"
            )}
          >
            {active && (
              <motion.span
                layoutId="product-pill"
                className="absolute inset-0 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
              {d.name}
              <span
                className={clsx(
                  "text-[11px]",
                  active ? "text-white/70" : "text-mocha/50"
                )}
              >
                {d.price.toFixed(2)}€
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}