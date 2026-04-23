"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Logo from "./Logo";

export default function Navbar({ tableNumber }: { tableNumber?: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "sticky top-0 z-40 safe-top transition-colors duration-300",
        scrolled ? "bg-cream/85 backdrop-blur-xl border-b border-espresso/5" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between px-5 h-14">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-wayne flex items-center justify-center">
            <span className="text-[10px] font-bold text-white tracking-widest">W</span>
          </div>
          <Logo className="text-[13px]" tracking="0.28em" />
        </div>

        {tableNumber && (
          <div className="flex items-center gap-1.5 px-3 h-8 rounded-full bg-espresso/5 border border-espresso/5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium tracking-wide uppercase">Table {tableNumber}</span>
          </div>
        )}
      </div>
    </motion.header>
  );
}
