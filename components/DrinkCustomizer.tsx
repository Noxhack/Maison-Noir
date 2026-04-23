"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  drinks,
  sizes,
  sugarLevels,
  syrups,
  toppings,
  milks,
  snacks,
  type Drink,
  type Extra,
  type Snack,
  type Size,
} from "@/lib/data";
import ProductSelector from "./ProductSelector";
import CartSummary from "./CartSummary";
import clsx from "clsx";

const ease = [0.22, 1, 0.36, 1] as const;

export default function DrinkCustomizer() {
  const [drinkId, setDrinkId] = useState<string>(drinks[0].id);
  const [size, setSize] = useState<Size>(sizes[1]);
  const [sugar, setSugar] = useState<number>(1);
  const [syrup, setSyrup] = useState<Extra | null>(null);
  const [milk, setMilk] = useState<Extra | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Extra[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<Snack[]>([]);

  const drink = useMemo(() => drinks.find((d) => d.id === drinkId)!, [drinkId]);

  const extras = useMemo<Extra[]>(() => {
    const list: Extra[] = [];
    if (syrup) list.push(syrup);
    if (milk) list.push(milk);
    return [...list, ...selectedToppings];
  }, [syrup, milk, selectedToppings]);

  const total = useMemo(() => {
    const base = drink.price * size.multiplier;
    const extrasSum = extras.reduce((s, e) => s + e.price, 0);
    const snacksSum = selectedSnacks.reduce((s, n) => s + n.price, 0);
    return Number((base + extrasSum + snacksSum).toFixed(2));
  }, [drink, size, extras, selectedSnacks]);

  const toggleTopping = (t: Extra) =>
    setSelectedToppings((prev) =>
      prev.find((x) => x.id === t.id) ? prev.filter((x) => x.id !== t.id) : [...prev, t]
    );

  const toggleSnack = (s: Snack) =>
    setSelectedSnacks((prev) =>
      prev.find((x) => x.id === s.id) ? prev.filter((x) => x.id !== s.id) : [...prev, s]
    );

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Visual panel */}
      <div className="lg:col-span-6 relative lg:sticky lg:top-28 h-fit">
        <div
          className="relative aspect-square w-full rounded-[40px] overflow-hidden border border-mocha/10 shadow-premium"
          style={{
            background: `radial-gradient(circle at 50% 38%, ${drink.accent}38, transparent 65%), linear-gradient(180deg, #F6F0E7 0%, #EADFCB 100%)`,
          }}
        >
          {/* Ambient glow (reacts to drink) */}
          <motion.div
            key={`glow-${drink.id}`}
            aria-hidden
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 40%, ${drink.accent}30, transparent 60%)` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.06, 1] }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          />

          {/* Concentric rings */}
          <div className="absolute inset-6 rounded-full ring-1 ring-espresso/10" />
          <div className="absolute inset-14 rounded-full ring-1 ring-espresso/10" />

          {/* Steam */}
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 h-20 w-24">
            <span className="steam left-[44%]" />
            <span className="steam" />
            <span className="steam" />
          </div>

          {/* Drink image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={drink.id}
              src={drink.image}
              alt={drink.name}
              initial={{ opacity: 0, scale: 0.88, rotate: -6, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.06, rotate: 6, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-8 md:inset-12 object-cover rounded-full shadow-deep"
              style={{ width: "calc(100% - 4rem)", height: "calc(100% - 4rem)" }}
            />
          </AnimatePresence>

          {/* Size badge */}
          <motion.div
            key={`size-${size.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-5 left-5 rounded-full glass px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-mocha"
          >
            {size.label} · {size.ml}
          </motion.div>

          {/* Origin chip */}
          <motion.div
            key={`origin-${drink.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-5 right-5 rounded-full glass-dark text-cream/90 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.25em]"
          >
            {drink.origin}
          </motion.div>

          {/* Price pill */}
          <div className="absolute bottom-5 right-5 rounded-2xl bg-espresso text-cream px-5 py-3 shadow-deep">
            <p className="text-[10px] uppercase tracking-[0.28em] opacity-70">Total</p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={total}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                className="font-serif text-2xl tabular-nums"
              >
                {total.toFixed(2)}€
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Drink info */}
        <div className="mt-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={drink.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease }}
            >
              <h3 className="font-serif text-3xl md:text-4xl text-espresso tracking-tightest">
                {drink.name}
              </h3>
              <p className="mt-1.5 text-mocha/80 text-lg">{drink.tagline}</p>
              <p className="mt-3 text-sm text-mocha/65 max-w-md leading-relaxed">
                {drink.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {drink.notes.map((n) => (
                  <span
                    key={n}
                    className="text-[11px] uppercase tracking-[0.2em] text-mocha/70 rounded-full border border-mocha/15 px-2.5 py-1"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="lg:col-span-6 flex flex-col gap-7 md:gap-8">
        <ProductSelector drinks={drinks} selectedId={drinkId} onSelect={setDrinkId} />

        <Group label="Taille" hint={size.ml}>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <SizeChip key={s.id} size={s} active={s.id === size.id} onClick={() => setSize(s)} />
            ))}
          </div>
        </Group>

        <Group label="Sucre" hint={sugar === 0 ? "Sans sucre" : `${sugar} dose${sugar > 1 ? "s" : ""}`}>
          <div className="flex gap-2">
            {sugarLevels.map((n) => (
              <Chip key={n} active={sugar === n} onClick={() => setSugar(n)}>
                {n === 0 ? "0" : "•".repeat(n)}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Sirop">
          <div className="flex flex-wrap gap-2">
            <Chip active={!syrup} onClick={() => setSyrup(null)}>Aucun</Chip>
            {syrups.map((s) => (
              <Chip key={s.id} active={syrup?.id === s.id} onClick={() => setSyrup(s)} price={s.price}>
                {s.name}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Lait">
          <div className="flex flex-wrap gap-2">
            <Chip active={!milk} onClick={() => setMilk(null)}>Entier</Chip>
            {milks.map((m) => (
              <Chip key={m.id} active={milk?.id === m.id} onClick={() => setMilk(m)} price={m.price}>
                {m.name}
              </Chip>
            ))}
          </div>
        </Group>

        <Group label="Topping">
          <div className="flex flex-wrap gap-2">
            {toppings.map((t) => {
              const active = !!selectedToppings.find((x) => x.id === t.id);
              return (
                <Chip key={t.id} active={active} onClick={() => toggleTopping(t)} price={t.price}>
                  {t.name}
                </Chip>
              );
            })}
          </div>
        </Group>

        <Group label="Snack maison" hint="Cuit le matin">
          <div className="grid grid-cols-3 gap-3">
            {snacks.map((s) => {
              const active = !!selectedSnacks.find((x) => x.id === s.id);
              return (
                <motion.button
                  key={s.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleSnack(s)}
                  className={clsx(
                    "group relative overflow-hidden rounded-2xl border text-left transition-all",
                    active
                      ? "border-espresso ring-2 ring-espresso/20 shadow-premium"
                      : "border-mocha/15 hover:border-mocha/30 hover:shadow-float"
                  )}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                    />
                    <AnimatePresence>
                      {active && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute top-2 right-2 h-6 w-6 rounded-full bg-espresso text-cream grid place-items-center text-xs shadow-premium"
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="px-3 py-2.5 bg-cream">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-espresso">{s.name}</span>
                      <span className="text-xs text-mocha/70 tabular-nums">{s.price.toFixed(2)}€</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-mocha/55 mt-0.5 truncate">
                      {s.tagline}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </Group>

        <CartSummary
          drink={drink}
          size={size}
          sugar={sugar}
          extras={extras}
          snacks={selectedSnacks}
          total={total}
        />
      </div>

      {/* Sticky mobile order bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease }}
        className="lg:hidden fixed bottom-3 inset-x-3 z-40 safe-bottom"
      >
        <div className="glass-dark rounded-2xl px-4 py-3 flex items-center justify-between shadow-deep">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/60">
              {drink.name} · {size.id}
            </p>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={total}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-serif text-lg text-cream tabular-nums"
              >
                {total.toFixed(2)}€
              </motion.p>
            </AnimatePresence>
          </div>
          <button className="rounded-full bg-cream text-espresso px-5 py-2.5 text-sm font-medium active:scale-95 transition-transform">
            Commander →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Group({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[11px] uppercase tracking-[0.3em] text-mocha/60">{label}</p>
        {hint && <p className="text-[11px] text-mocha/50">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  price,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  price?: number;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      className={clsx(
        "relative rounded-full px-4 py-2.5 text-sm border transition-all min-h-[44px]",
        active
          ? "bg-espresso text-cream border-espresso shadow-premium"
          : "border-mocha/20 text-mocha/80 bg-cream hover:border-mocha/40 hover:bg-mocha/5"
      )}
    >
      <span className="flex items-center gap-2">
        {children}
        {price !== undefined && (
          <span className={clsx("text-[11px] tabular-nums", active ? "text-cream/70" : "text-mocha/50")}>
            +{price.toFixed(2)}€
          </span>
        )}
      </span>
    </motion.button>
  );
}

function SizeChip({ size, active, onClick }: { size: Size; active: boolean; onClick: () => void }) {
  const scale = size.id === "S" ? 0.7 : size.id === "M" ? 0.85 : 1;
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        "relative flex items-center justify-center gap-3 rounded-2xl border p-4 min-h-[72px] transition-all",
        active
          ? "bg-espresso text-cream border-espresso shadow-premium"
          : "border-mocha/15 bg-cream text-mocha/80 hover:border-mocha/30 hover:shadow-float"
      )}
    >
      <span
        className={clsx("rounded-full transition-all", active ? "bg-cream/20" : "bg-mocha/10")}
        style={{ width: 28 * scale, height: 34 * scale }}
      />
      <div className="text-left">
        <p className="text-sm font-medium">{size.id}</p>
        <p className={clsx("text-[10px] uppercase tracking-[0.2em]", active ? "text-cream/60" : "text-mocha/50")}>
          {size.ml}
        </p>
      </div>
    </motion.button>
  );
}
