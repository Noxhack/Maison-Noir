"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Drink, Extra, Snack, Size } from "@/lib/data";

type Props = {
  drink: Drink;
  size: Size;
  sugar: number;
  extras: Extra[];
  snacks: Snack[];
  total: number;
};

export default function CartSummary({
  drink,
  size,
  sugar,
  extras,
  snacks,
  total,
}: Props) {
  const lines = [
    { key: "drink", label: `${drink.name} · ${size.id}`, price: drink.price * size.multiplier, isMain: true },
    ...(sugar > 0 ? [{ key: "sugar", label: `Sucre · ${sugar}`, price: 0 }] : []),
    ...extras.map((e) => ({ key: e.id, label: e.name, price: e.price })),
    ...snacks.map((s) => ({ key: s.id, label: s.name, price: s.price })),
  ];

  return (
    <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500">
          {lines.length} article{lines.length > 1 ? "s" : ""}
        </span>
        <span className="text-xs text-gray-400">~3 min</span>
      </div>

      {/* LIGNES */}
      <div className="space-y-2">
        {lines.map((l) => (
          <div key={l.key} className="flex justify-between text-sm">
            <span className={l.isMain ? "font-medium" : "text-gray-600"}>
              {l.label}
            </span>
            <span className="text-gray-500">
              {l.price > 0 ? `${l.price.toFixed(2)}€` : "Inclus"}
            </span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between items-center mt-4 pt-3 border-t">
        <span className="text-lg font-semibold">Total</span>
        <span className="text-xl font-bold">
          {total.toFixed(2)}€
        </span>
      </div>

      {/* BOUTON */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        className="mt-4 w-full bg-black text-white py-4 rounded-full text-base font-medium"
      >
        Commander · {total.toFixed(2)}€
      </motion.button>

      {/* PAIEMENT */}
      <div className="mt-3 flex justify-center gap-3 text-[10px] text-gray-400">
        <span>Apple Pay</span>
        <span>•</span>
        <span>Bancontact</span>
        <span>•</span>
        <span>Carte</span>
      </div>
    </div>
  );
}