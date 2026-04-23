"use client";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { reviews } from "@/lib/data";
import { brand } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Reviews() {
  return (
    <SectionWrapper
      id="avis"
      eyebrow="Ils reviennent chaque matin"
      title={`${brand.social.rating}/5 — ${brand.social.reviews} avis.`}
      intro="Les retours qui nous font lever tôt."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            className="rounded-2xl bg-cream border border-mocha/10 p-4 md:p-6 flex flex-col gap-3 shadow-sm"
          >
            {/* étoiles */}
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-caramel text-sm">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[10px] text-mocha/50">Google</span>
            </div>

            {/* texte */}
            <blockquote className="text-sm md:text-base text-espresso leading-snug">
              “{r.text}”
            </blockquote>

            {/* user */}
            <figcaption className="mt-auto flex items-center gap-2 pt-2 border-t border-mocha/10">
              <img
                src={r.avatar}
                alt={r.name}
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs md:text-sm text-espresso">{r.name}</p>
                <p className="text-[10px] text-mocha/60">{r.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionWrapper>
  );
}