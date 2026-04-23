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
      intro="Les retours qui nous font lever tôt. Merci à celles et ceux qui font vivre la maison."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] bg-cream border border-mocha/10 p-6 md:p-7 flex flex-col gap-4 hover:shadow-premium transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5 text-caramel text-sm">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-mocha/50">Google</span>
            </div>
            <blockquote className="font-serif text-lg md:text-xl text-espresso leading-snug text-balance">
              “{r.text}”
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3 pt-3 border-t border-mocha/10">
              <img
                src={r.avatar}
                alt={r.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-cream"
                loading="lazy"
              />
              <div>
                <p className="text-sm text-espresso">{r.name}</p>
                <p className="text-xs text-mocha/60">{r.role}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionWrapper>
  );
}
