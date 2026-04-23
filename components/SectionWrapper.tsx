"use client";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
};

export default function SectionWrapper({ id, children, className, eyebrow, title, intro }: Props) {
  const reduce = useReducedMotion();
  return (
    <section id={id} className={clsx("relative w-full px-4 md:px-10 py-20 md:py-32", className)}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || intro) && (
          <motion.header
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 md:mb-20 max-w-3xl"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mocha/70">
                <span className="h-px w-8 bg-mocha/40" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tightest text-balance text-espresso">
                {title}
              </h2>
            )}
            {intro && <p className="mt-6 text-lg md:text-xl text-mocha/80 max-w-2xl text-balance">{intro}</p>}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}
