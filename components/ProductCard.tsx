"use client";
import { motion } from "framer-motion";
import type { Drink } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProductCard({ drink, index }: { drink: Drink; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease, delay: index * 0.08 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[28px] bg-cream border border-mocha/10 hover:shadow-premium transition-shadow"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={drink.image}
          alt={drink.name}
          className="h-full w-full object-cover"
          initial={{ scale: 1.02 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/0 to-transparent" />

        {/* Origin chip */}
        <span className="absolute top-4 left-4 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-mocha shadow-float">
          {drink.origin}
        </span>

        {/* Hover add button */}
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-cream text-espresso shadow-premium opacity-0 group-hover:opacity-100 transition-opacity"
        >
          +
        </motion.span>

        {/* Bottom info overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream/70">Signature</p>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-2xl md:text-3xl tracking-tightest">{drink.name}</h3>
            <span className="font-serif text-lg tabular-nums">{drink.price.toFixed(2)}€</span>
          </div>
        </div>
      </div>
      <div className="p-5 md:p-6">
        <p className="text-sm text-espresso">{drink.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {drink.notes.map((n) => (
            <span
              key={n}
              className="text-[10px] uppercase tracking-[0.2em] text-mocha/65 rounded-full border border-mocha/12 px-2 py-0.5"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
