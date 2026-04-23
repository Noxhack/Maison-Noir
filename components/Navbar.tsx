"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import clsx from "clsx";

const links = [
  { href: "#experience", label: "Commander" },
  { href: "#menu", label: "Menu" },
  { href: "#univers", label: "Univers" },
  { href: "#avis", label: "Avis" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 30)), [scrollY]);
  const padY = useTransform(scrollY, [0, 120], [22, 10]);

  return (
    <motion.header
      style={{ paddingTop: padY, paddingBottom: padY }}
      className={clsx(
        "fixed top-0 inset-x-0 z-50 px-4 md:px-10 transition-colors duration-500",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-espresso text-cream text-[11px] font-serif">
            N
            <span className="absolute inset-0 rounded-full ring-1 ring-espresso/20" />
          </span>
          <span className="font-serif text-lg md:text-xl text-espresso tracking-tight">
            {brand.name}
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-[13px] text-mocha/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative hover:text-espresso transition-colors group">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-espresso transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#experience"
          className="group inline-flex items-center gap-2 rounded-full bg-espresso text-cream px-4 md:px-5 py-2.5 text-[13px] hover:bg-mocha transition-all hover:scale-[1.02] active:scale-95"
        >
          <span className="hidden sm:inline">{brand.cta.primary}</span>
          <span className="sm:hidden">Order</span>
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </nav>
    </motion.header>
  );
}
