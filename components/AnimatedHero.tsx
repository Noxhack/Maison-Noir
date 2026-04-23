"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { brand } from "@/lib/brand";

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimatedHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Subtle cursor-parallax on the cup (signature detail)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden pt-28 md:pt-36"
    >
      {/* Background glows */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full bg-caramel/30 blur-[120px]"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 -left-32 h-[480px] w-[480px] rounded-full bg-latte/50 blur-[120px]"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-14 items-center">
        {/* Copy */}
        <motion.div style={{ y, opacity }} className="md:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="inline-flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.28em] text-mocha/80"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-caramel animate-ping opacity-60" />
              <span className="relative rounded-full h-1.5 w-1.5 bg-caramel" />
            </span>
            Ouvert · {brand.city}
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
            className="mt-5 font-serif text-display text-espresso"
          >
            {["Le café,", "repensé", "pour vos", "matins."].map((line, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
                transition={{ duration: 1, ease }}
                className="block overflow-hidden"
              >
                <span className={i === 1 ? "block italic text-caramel" : "block"}>{line}</span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease }}
            className="mt-7 max-w-md text-lg md:text-xl text-mocha/80 text-balance leading-relaxed"
          >
            Grains d'origine, torréfaction artisanale, rituels lents.
            <span className="text-espresso"> Prêt en 3 minutes.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-3 rounded-full bg-espresso text-cream px-7 py-4 text-sm md:text-base shadow-premium hover:bg-mocha hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {brand.cta.primary}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm md:text-base text-espresso hover:bg-mocha/5 transition-colors"
            >
              {brand.cta.secondary}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-12 flex items-center gap-5"
          >
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-8 w-8 rounded-full ring-2 ring-cream bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://i.pravatar.cc/60?img=${i + 12})`,
                  }}
                />
              ))}
            </div>
            <div className="text-xs text-mocha/70">
              <p className="text-espresso">
                <span className="text-caramel">★★★★★</span> {brand.social.rating}/5
              </p>
              <p className="mt-0.5">{brand.social.reviews} clients · fidèles depuis 2019</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          style={{ scale }}
          onMouseMove={onMove}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          className="md:col-span-6 relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto"
          >
            {/* Rotating rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-latte via-sand to-caramel/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-3 rounded-full ring-1 ring-espresso/10" />
            <div className="absolute inset-8 rounded-full ring-1 ring-espresso/10" />

            {/* Steam signature */}
            <div className="absolute left-1/2 top-[8%] -translate-x-1/2 h-16 w-20">
              <span className="steam left-[44%]" />
              <span className="steam" />
              <span className="steam" />
            </div>

            {/* Cup with parallax + deep shadow */}
            <motion.div
              style={{ x: sx, y: sy }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1517959105821-eaf2591984ca?auto=format&fit=crop&w=1400&q=90"
                alt="Signature latte"
                className="w-[92%] h-[92%] object-cover rounded-[42%] shadow-deep"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Signature price card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.9, ease }}
              className="absolute -left-2 md:-left-6 bottom-10 rounded-2xl glass px-4 py-3 shadow-float"
            >
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-caramel/30 grid place-items-center text-espresso">
                  ☕
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-mocha/60">Signature</p>
                  <p className="font-serif text-base text-espresso">Latte · 4.50€</p>
                </div>
              </div>
            </motion.div>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.9, ease }}
              className="absolute -right-1 md:-right-4 top-10 rounded-full glass-dark text-cream pl-2.5 pr-4 py-2 text-[11px] flex items-center gap-2 shadow-premium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-caramel animate-ping opacity-70" />
                <span className="relative rounded-full h-2 w-2 bg-caramel" />
              </span>
              Prêt dans 3 min
            </motion.div>

            {/* Origin chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.55, duration: 0.9, ease }}
              className="absolute right-4 md:right-6 bottom-6 rounded-full bg-cream/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-mocha shadow-premium"
            >
              Colombie · Huila
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee signature */}
      <div className="mt-16 md:mt-24 overflow-hidden border-y border-mocha/10 py-5">
        <div className="marquee-track whitespace-nowrap flex gap-10 font-serif text-mocha/60 text-2xl md:text-3xl italic">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10">
              {["Slow coffee", "·", "Single origin", "·", "Roasted in Brussels", "·", "Small batch", "·", "Made by hand", "·"].map((t, i) => (
                <span key={`${k}-${i}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
