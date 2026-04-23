"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

/**
 * Splash loader avec kill-switch 2s.
 * Garantit que le site s'affiche même si une animation ou un asset bloque.
 */
const MAX_MS = 2000;

export default function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const start = performance.now();
    let raf = 0;
    let killed = false;

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(100, Math.round((elapsed / MAX_MS) * 100));
      setProgress(p);
      if (p < 100 && !killed) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Fallback absolu : jamais plus de MAX_MS sur le loader
    const hardKill = window.setTimeout(() => {
      killed = true;
      setProgress(100);
      setVisible(false);
    }, MAX_MS);

    // Cache dès que la page est prête, si avant le kill
    const softHide = () => {
      if (document.readyState === "complete") {
        setProgress(100);
        window.setTimeout(() => setVisible(false), 250);
      }
    };
    if (document.readyState === "complete") softHide();
    else window.addEventListener("load", softHide, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hardKill);
      window.removeEventListener("load", softHide);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-espresso text-cream"
          aria-hidden
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream text-espresso font-serif">
              N
            </span>
            <span className="font-serif text-2xl">{brand.name}</span>
          </motion.div>
          <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-cream/15">
            <motion.div
              className="h-full bg-caramel"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream/50 tabular-nums">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
