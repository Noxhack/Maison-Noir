"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";

const GALLERY = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=85",
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85",
  "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=85",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=85",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=85",
  "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=85",
];

const MENU_HIGHLIGHTS = [
  { cat: "Coffee", name: "Flat White", desc: "Velvet milk, double shot", price: "4,90 €", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&q=80" },
  { cat: "Sweet", name: "Basque Cheesecake", desc: "Burnt top, silky inside", price: "4,50 €", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=80" },
  { cat: "Savoury", name: "Avocado Toast", desc: "Sourdough, smashed avocado", price: "10 €", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&q=80" },
  { cat: "Juices", name: "Red Miracle", desc: "Beetroot, apple, ginger", price: "6,80 €", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80" },
];

const REVIEWS = [
  { name: "Lina M.", text: "Best matcha in Brussels. The vibe is absolutely perfect — minimal, warm, unhurried.", stars: 5 },
  { name: "Adam B.", text: "Come here every morning before work. The flat white is unreal, and the cheesecake is a must.", stars: 5 },
  { name: "Sarah K.", text: "Wayne has become my go-to. The food is beautiful, the coffee is serious.", stars: 5 },
  { name: "Nora D.", text: "Ordered via QR code without leaving my seat. This is the future of cafés.", stars: 5 },
];

export default function SitePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="bg-[#0F0B08] text-[#F7F2EA] font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-wayne flex items-center justify-center">
            <span className="text-[9px] font-bold text-white tracking-widest">W</span>
          </div>
          <Logo className="text-[12px] text-[#F7F2EA]" tracking="0.28em" />
        </div>
        <div className="flex items-center gap-3">
          <a href="#menu" className="text-[13px] text-[#F7F2EA]/60 hover:text-[#F7F2EA] transition hidden sm:block">Menu</a>
          <Link href="/" className="h-9 px-5 rounded-full bg-wayne text-white text-[13px] font-medium flex items-center gap-1.5 active:scale-95 transition hover:bg-waynedeep">
            <span>Order now</span>
            <span className="text-[10px] opacity-70">→</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=90"
            alt="Wayne café"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B08] via-[#0F0B08]/40 to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 px-6 pb-16 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase text-wayne mb-4">Est. Bruxelles — Ixelles</p>
            <h1 className="font-serif text-[clamp(52px,12vw,96px)] leading-[0.92] tracking-tight">
              Coffee<br />
              <span className="text-[#F7F2EA]/40 italic">& more.</span>
            </h1>
            <p className="mt-6 text-[15px] text-[#F7F2EA]/70 max-w-xs leading-relaxed">
              A modern café built around specialty coffee, fresh food, and a place worth staying in.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/" className="h-12 px-8 rounded-full bg-[#F7F2EA] text-[#0F0B08] font-semibold text-[14px] flex items-center active:scale-[0.98] transition hover:bg-wayne hover:text-white">
                Scan & Order
              </Link>
              <a href="#story" className="text-[13px] text-[#F7F2EA]/60 hover:text-[#F7F2EA] transition flex items-center gap-1.5">
                Our story <span>↓</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-6 flex flex-col items-center gap-1.5"
        >
          <div className="h-8 w-px bg-[#F7F2EA]/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full h-1/2 bg-wayne"
              animate={{ y: ["0%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-[9px] tracking-widest uppercase text-[#F7F2EA]/30 rotate-90 origin-center translate-x-3">scroll</span>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-[#F7F2EA]/8 py-3 overflow-hidden bg-[#0F0B08]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap"
        >
          {Array(8).fill(["Specialty Coffee", "·", "Fresh Juices", "·", "All-Day Brunch", "·", "Matcha & Chai", "·"]).flat().map((t, i) => (
            <span key={i} className={`text-[12px] tracking-widest uppercase ${t === "·" ? "text-wayne" : "text-[#F7F2EA]/30"}`}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* STORY */}
      <section id="story" className="px-6 py-24 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-wayne mb-6">Who we are</p>
          <p className="font-serif text-[clamp(28px,5vw,42px)] leading-[1.15] tracking-tight text-[#F7F2EA]">
            Wayne is not just a café. It's a daily ritual — for the early risers, the remote workers, the brunch lovers, the matcha curious.
          </p>
          <p className="mt-6 text-[15px] text-[#F7F2EA]/55 leading-relaxed">
            We obsess over sourcing. Every coffee is specialty grade. Every juice is pressed that morning. Every dish is built with intention. We're in Ixelles, Brussels — but we feel like nowhere you've been before.
          </p>
        </motion.div>
      </section>

      {/* GALLERY GRID */}
      <section className="px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto">
          {GALLERY.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl bg-[#1a1410] ${i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}
            >
              <Image src={src} alt="" fill className="object-cover hover:scale-105 transition-transform duration-700" unoptimized />
            </motion.div>
          ))}
        </div>
      </section>

      {/* MENU HIGHLIGHTS */}
      <section id="menu" className="px-6 py-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-wayne mb-3">What we serve</p>
          <h2 className="font-serif text-[clamp(36px,7vw,56px)] leading-[1] tracking-tight">The menu.</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {MENU_HIGHLIGHTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl bg-[#1a1410] border border-[#F7F2EA]/6"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B08]/80 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-wayne/80 text-[10px] font-medium text-white tracking-wide">{item.cat}</span>
                </div>
              </div>
              <div className="p-3">
                <div className="font-medium text-[14px]">{item.name}</div>
                <div className="text-[12px] text-[#F7F2EA]/50 mt-0.5">{item.desc}</div>
                <div className="text-[13px] font-semibold text-wayne mt-1.5">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href="/"
          className="w-full h-12 rounded-full border border-[#F7F2EA]/15 text-[#F7F2EA]/80 text-[14px] font-medium flex items-center justify-center hover:border-wayne hover:text-wayne transition active:scale-[0.98]"
        >
          View full menu & order →
        </Link>
      </section>

      {/* ORDERING FEATURE */}
      <section className="px-6 py-20 bg-[#0D0A07]">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] border border-[#F7F2EA]/8 overflow-hidden"
          >
            <div className="bg-wayne p-8 text-center">
              <Logo className="text-white text-[32px] mb-2" tracking="0.3em" />
              <p className="text-white/70 text-[12px] tracking-widest uppercase">Digital Ordering</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { n: "01", t: "Scan the QR code on your table", d: "No app needed. Instant access." },
                { n: "02", t: "Browse & customize", d: "Choose your size, milk, extras." },
                { n: "03", t: "Pay & relax", d: "Apple Pay, card, or at the counter." },
              ].map((step) => (
                <div key={step.n} className="flex items-start gap-4">
                  <span className="text-[11px] font-mono text-wayne mt-0.5">{step.n}</span>
                  <div>
                    <div className="text-[14px] font-medium">{step.t}</div>
                    <div className="text-[12px] text-[#F7F2EA]/45 mt-0.5">{step.d}</div>
                  </div>
                </div>
              ))}
              <Link
                href="/"
                className="block w-full h-11 rounded-full bg-[#F7F2EA] text-[#0F0B08] font-semibold text-[13px] flex items-center justify-center mt-2 active:scale-[0.98] transition hover:bg-wayne hover:text-white"
              >
                Try it now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-6 py-20 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-wayne mb-3">What they say</p>
          <h2 className="font-serif text-[clamp(32px,6vw,48px)] leading-[1] tracking-tight">4.9 ★</h2>
        </motion.div>
        <div className="space-y-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-b border-[#F7F2EA]/8 pb-4 last:border-0"
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="font-medium text-[14px]">{r.name}</span>
                <span className="text-wayne text-[11px]">{"★".repeat(r.stars)}</span>
              </div>
              <p className="text-[13.5px] text-[#F7F2EA]/60 leading-relaxed italic">"{r.text}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-sm mx-auto"
        >
          <div className="h-16 w-16 rounded-full bg-wayne mx-auto mb-6 flex items-center justify-center shadow-lift">
            <Logo className="text-white text-[10px]" tracking="0.2em" />
          </div>
          <h2 className="font-serif text-[40px] leading-[1] tracking-tight mb-4">
            See you<br /><span className="text-[#F7F2EA]/40 italic">tomorrow.</span>
          </h2>
          <p className="text-[14px] text-[#F7F2EA]/50 mb-8 leading-relaxed">
            Ixelles, Brussels<br />Open daily · Card only
          </p>
          <Link
            href="/"
            className="inline-flex h-12 px-8 rounded-full bg-wayne text-white font-medium text-[14px] items-center justify-center active:scale-[0.98] transition hover:bg-waynedeep shadow-lift"
          >
            Order from your table →
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#F7F2EA]/8 px-6 py-8 flex items-center justify-between">
        <Logo className="text-[11px] text-[#F7F2EA]/30" tracking="0.3em" />
        <p className="text-[11px] text-[#F7F2EA]/25">© 2025 Wayne</p>
      </footer>
    </div>
  );
}
