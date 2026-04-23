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

export default function CartSummary({ drink, size, sugar, extras, snacks, total }: Props) {
  const lines = [
    { key: "drink", label: `${drink.name} · ${size.id}`, price: drink.price * size.multiplier, isMain: true },
    ...(sugar > 0 ? [{ key: "sugar", label: `Sucre · ${sugar} dose${sugar > 1 ? "s" : ""}`, price: 0 }] : []),
    ...extras.map((e) => ({ key: e.id, label: e.name, price: e.price })),
    ...snacks.map((s) => ({ key: s.id, label: s.name, price: s.price })),
  ];

  return (
    <div className="mt-2 rounded-[28px] border border-mocha/12 bg-cream p-5 md:p-6 shadow-float">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream text-[10px]">
            {lines.length}
          </span>
          <p className="text-[11px] uppercase tracking-[0.3em] text-mocha/60">Votre commande</p>
        </div>
        <span className="text-[11px] text-mocha/50">Prêt en 3 min</span>
      </div>

      <ul className="divide-y divide-mocha/10">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li
              key={l.key}
              layout
              initial={{ opacity: 0, x: -12, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 12, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span className={l.isMain ? "text-espresso font-medium" : "text-mocha"}>{l.label}</span>
              <span className="text-mocha/70 tabular-nums">
                {l.price > 0 ? `${l.price.toFixed(2)}€` : "Inclus"}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-4 flex items-baseline justify-between border-t border-mocha/10 pt-4">
        <span className="font-serif text-2xl text-espresso">Total</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={total}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="font-serif text-3xl text-espresso tabular-nums"
          >
            {total.toFixed(2)}€
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="mt-5 group w-full rounded-full bg-espresso text-cream py-4 text-sm md:text-base hover:bg-mocha transition-colors flex items-center justify-center gap-2 shadow-premium"
      >
        Confirmer · <span className="tabular-nums">{total.toFixed(2)}€</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </motion.button>
      <div className="mt-3 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] text-mocha/55">
        <span>Apple Pay</span>
        <span className="h-2 w-px bg-mocha/20" />
        <span>Bancontact</span>
        <span className="h-2 w-px bg-mocha/20" />
        <span>Carte</span>
      </div>
    </div>
  );
}
