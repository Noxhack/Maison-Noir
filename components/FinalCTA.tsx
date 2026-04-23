"use client";
import { motion } from "framer-motion";
import { brand } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  return (
    <section className="px-4 md:px-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl relative overflow-hidden rounded-[36px] md:rounded-[44px] bg-espresso text-cream px-7 md:px-16 py-20 md:py-32 shadow-deep">
        <motion.div
          aria-hidden
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-caramel/30 blur-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-latte/20 blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative grid md:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="md:col-span-8"
          >
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-cream/60">
              <span className="h-px w-8 bg-cream/30" /> À votre tour
            </span>
            <h2 className="mt-5 font-serif text-display-sm text-balance">
              Votre café vous <span className="italic text-caramel">attend.</span>
            </h2>
            <p className="mt-6 max-w-xl text-cream/75 text-lg">
              Commande depuis votre téléphone, récup en 3 minutes. Pas de queue, juste le meilleur café.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="md:col-span-4 flex md:justify-end"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-3 rounded-full bg-cream text-espresso px-8 py-5 text-base shadow-premium hover:bg-caramel transition-all hover:scale-[1.02] active:scale-95"
            >
              {brand.cta.primary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
