"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { ambience } from "@/lib/data";

export default function Universe() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <SectionWrapper
      id="univers"
      eyebrow="Notre univers"
      title="Un lieu. Un rituel. Une maison."
      intro="Bois brut, lumière douce, café parfait."
    >
      <div ref={ref} className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-6">

        {/* IMAGE PRINCIPALE */}
        <motion.div
          style={{ y: y1 }}
          className="w-full h-[250px] md:h-auto md:col-span-7 rounded-2xl overflow-hidden shadow-premium"
        >
          <img
            src={ambience[0]}
            alt="Salle principale"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* COLONNE DROITE */}
        <div className="flex flex-col gap-4 md:col-span-5">

          {/* IMAGE 2 */}
          <motion.div
            style={{ y: y2 }}
            className="w-full h-[180px] md:h-auto rounded-2xl overflow-hidden shadow-float"
          >
            <img
              src={ambience[1]}
              alt="Comptoir"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* BLOC TEXTE */}
          <div className="rounded-2xl bg-black text-white p-5 relative overflow-hidden">

            <p className="text-xs uppercase text-white/60">Depuis 2019</p>

            <p className="mt-2 text-lg md:text-xl font-serif">
              Maison indépendante. Café de qualité.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <Stat value="12" label="Origines" />
              <Stat value="48h" label="Torréfaction" />
              <Stat value="4.9★" label="Avis" />
            </div>
          </div>

          {/* IMAGE 3 */}
          <motion.div
            style={{ y: y3 }}
            className="w-full h-[200px] md:h-auto rounded-2xl overflow-hidden shadow-float"
          >
            <img
              src={ambience[2]}
              alt="Latte"
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-[10px] text-white/60">{label}</p>
    </div>
  );
}