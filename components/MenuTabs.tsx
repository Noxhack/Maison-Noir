"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { MenuCategory } from "@/lib/menu";

export default function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const probe = window.innerHeight * 0.28;
        let current = categories[0]?.id;
        for (const cat of categories) {
          const el = document.getElementById(`cat-${cat.id}`);
          if (el && el.getBoundingClientRect().top <= probe) current = cat.id;
        }
        if (current && current !== active) setActive(current);
        tickingRef.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories, active]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(`[data-id="${active}"]`);
    if (btn) {
      const left = btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-14 z-30 bg-cream/90 backdrop-blur-xl border-b border-espresso/5">
      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-1 overflow-x-auto px-4 py-2.5"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            data-id={c.id}
            onClick={() => jumpTo(c.id)}
            className={clsx(
              "shrink-0 h-9 px-4 rounded-full text-[13px] font-medium transition-all duration-300",
              active === c.id
                ? "bg-espresso text-cream"
                : "text-espresso/60 hover:text-espresso"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
