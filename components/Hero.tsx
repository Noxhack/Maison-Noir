"use client";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Hero() {
  return (
    <section className="relative px-5 pt-6 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[28px] bg-wayne aspect-[4/3] shadow-lift"
      >
        <div
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.25), transparent 60%), radial-gradient(90% 60% at 80% 100%, rgba(0,0,0,0.25), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-white/90 text-[11px] tracking-widest uppercase">
            <span>Est. Bruxelles</span>
            <span>Coffee · Food</span>
          </div>

          <div className="flex items-center justify-center">
            <Logo className="text-white text-5xl" tracking="0.3em" />
          </div>

          <div className="flex items-end justify-between text-white/85 text-[11px] tracking-wider uppercase">
            <span>Scan · Order · Enjoy</span>
            <span className="font-medium">N°01</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        <h1 className="font-serif text-[34px] leading-[1.05] tracking-tight text-espresso">
          Good morning.<br />
          <span className="text-espresso/50">What would you like?</span>
        </h1>
        <p className="mt-3 text-[13.5px] text-espresso/60 leading-relaxed">
          Browse the menu, customize your order and send it straight to the counter — no waiting in line.
        </p>
      </motion.div>
    </section>
  );
}
