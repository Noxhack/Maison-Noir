"use client";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import clsx from "clsx";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 30));
  }, [scrollY]);

  return (
    <motion.header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 px-4 py-3 flex justify-between items-center",
        scrolled ? "bg-white/80 backdrop-blur border-b" : "bg-transparent"
      )}
    >
      {/* LOGO */}
      <a href="#top" className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-xs">
          N
        </div>
        <span className="font-semibold text-sm">
          {brand.name}
        </span>
      </a>

      {/* BOUTON MOBILE */}
      <a
        href="#experience"
        className="bg-black text-white px-4 py-2 rounded-full text-sm active:scale-95"
      >
        Commander
      </a>
    </motion.header>
  );
}