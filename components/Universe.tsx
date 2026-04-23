"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { ambience } from "@/lib/data";

export default function Universe() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <SectionWrapper
      id="univers"
      eyebrow="Notre univers"
      title="Un lieu. Un rituel. Une maison."
      intro="Bois brut, lumière douce, grain fraîchement moulu. On a pensé cet endroit comme une parenthèse — la vôtre."
    >
      <div ref={ref} className="grid md:grid-cols-12 gap-5 md:gap-6">
        <motion.div
          style={{ y: y1 }}
          className="md:col-span-7 aspect-[4/5] md:aspect-[5/6] rounded-[32px] overflow-hidden shadow-premium"
        >
          <img
            src={ambience[0]}
            alt="Salle principale"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        <div className="md:col-span-5 flex flex-col gap-5 md:gap-6">
          <motion.div style={{ y: y2 }} className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-float">
            <img src={ambience[1]} alt="Comptoir" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>

          <div className="rounded-[32px] bg-espresso text-cream p-7 md:p-9 relative overflow-hidden shadow-premium">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-caramel/25 blur-3xl" />
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-latte/20 blur-3xl" />
            <p className="relative text-[11px] uppercase tracking-[0.3em] text-cream/60">Depuis 2019</p>
            <p className="relative mt-4 font-serif text-2xl md:text-[28px] leading-[1.15] text-balance">
              Maison indépendante. Grains choisis main. Rituels non négociables.
            </p>
            <div className="relative mt-8 grid grid-cols-3 gap-3 text-sm">
              <Stat value="12" label="Origines" />
              <Stat value="48h" label="Torréfaction" />
              <Stat value="4.9★" label="1 240 avis" />
            </div>
          </div>

          <motion.div style={{ y: y3 }} className="aspect-square rounded-[32px] overflow-hidden shadow-float">
            <img src={ambience[2]} alt="Latte art" className="h-full w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-cream/20 pt-3">
      <p className="font-serif text-2xl tabular-nums">{value}</p>
      <p className="text-[10px] uppercase tracking-[0.22em] text-cream/60 mt-0.5">{label}</p>
    </div>
  );
}
