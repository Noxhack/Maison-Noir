"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import type { MenuCategory, MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/cart";

export default function MenuList({
  categories,
  onSelect,
}: {
  categories: MenuCategory[];
  onSelect: (item: MenuItem, category: MenuCategory) => void;
}) {
  return (
    <div className="px-5 pt-6 pb-40">
      {categories.map((cat) => (
        <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-28 mb-10">
          <header className="mb-4">
            <h2 className="font-serif text-[28px] tracking-tight text-espresso">{cat.name}</h2>
            {cat.subtitle && (
              <p className="mt-0.5 text-[12px] uppercase tracking-widest text-espresso/40">{cat.subtitle}</p>
            )}
          </header>
          <ul className="divide-y divide-espresso/8">
            {cat.items.map((item, i) => (
              <MenuRow key={item.id} item={item} index={i} onSelect={() => onSelect(item, cat)} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MenuRow({ item, index, onSelect }: { item: MenuItem; index: number; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const basePrice = item.price ?? item.variants?.[0]?.price ?? 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.03 }}
      className="relative"
    >
      {/* Image hover preview */}
      <AnimatePresence>
        {hovered && item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-12 top-1/2 -translate-y-1/2 z-20 w-24 h-24 rounded-2xl overflow-hidden shadow-lift border border-white/60 pointer-events-none"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="96px"
              unoptimized
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        onClick={onSelect}
        className="group w-full py-4 flex items-start gap-4 text-left active:scale-[0.99] transition-transform"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-[15.5px] font-medium text-espresso">{item.name}</h3>
          {item.description && (
            <p className="mt-0.5 text-[12.5px] text-espresso/55 leading-relaxed line-clamp-1">
              {item.description}
            </p>
          )}
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-[13px] font-semibold text-espresso">
              {item.variants ? `from ${formatPrice(basePrice)}` : formatPrice(basePrice)}
            </span>
            {item.customizable && (
              <span className="text-[10.5px] uppercase tracking-wider text-espresso/40">· custom</span>
            )}
          </div>
        </div>

        <div className="shrink-0 h-9 w-9 rounded-full bg-espresso text-cream flex items-center justify-center shadow-soft transition-all duration-200 group-hover:scale-110 group-hover:bg-wayne group-active:scale-95">
          <Plus className="h-4 w-4" strokeWidth={2.25} />
        </div>
      </button>
    </motion.li>
  );
}
