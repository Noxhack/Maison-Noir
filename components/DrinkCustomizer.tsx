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
    <div className="grid lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 px-3 md:px-0">
      
      {/* IMAGE PRINCIPALE FIX MOBILE */}
      <div className="lg:col-span-6 relative lg:sticky lg:top-28">
        <div className="w-full overflow-hidden rounded-3xl shadow-premium">
          
          <AnimatePresence mode="wait">
            <motion.img
              key={drink.id}
              src={drink.image}
              alt={drink.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </AnimatePresence>

        </div>

        {/* INFOS */}
        <div className="mt-5 px-1">
          <h3 className="font-serif text-2xl md:text-3xl text-espresso">
            {drink.name}
          </h3>
          <p className="text-mocha/70 text-sm md:text-base mt-1">
            {drink.tagline}
          </p>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="lg:col-span-6 flex flex-col gap-6">

        <ProductSelector drinks={drinks} selectedId={drinkId} onSelect={setDrinkId} />

        <Group label="Taille">
          <div className="grid grid-cols-2 gap-2">
            {sizes.map((s) => (
              <SizeChip key={s.id} size={s} active={s.id === size.id} onClick={() => setSize(s)} />
            ))}
          </div>
        </Group>

        <Group label="Sucre">
          <div className="flex gap-2 flex-wrap">
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

        <Group label="Snack">
          <div className="grid grid-cols-2 gap-3">
            {snacks.map((s) => {
              const active = !!selectedSnacks.find((x) => x.id === s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSnack(s)}
                  className={clsx(
                    "rounded-xl border overflow-hidden",
                    active ? "border-espresso" : "border-mocha/20"
                  )}
                >
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-[120px] object-cover"
                  />
                  <div className="p-2 text-sm flex justify-between">
                    <span>{s.name}</span>
                    <span>{s.price}€</span>
                  </div>
                </button>
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

      {/* BAR MOBILE */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-50">
        <div className="bg-black text-white rounded-full px-4 py-3 flex justify-between items-center">
          <span>{total.toFixed(2)}€</span>
          <button className="bg-white text-black px-4 py-2 rounded-full">
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase text-mocha/60 mb-2">{label}</p>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children, price }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-2 rounded-full text-sm border",
        active ? "bg-black text-white" : "border-gray-300"
      )}
    >
      {children} {price && `+${price}€`}
    </button>
  );
}

function SizeChip({ size, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-3 rounded-xl border",
        active ? "bg-black text-white" : "border-gray-300"
      )}
    >
      {size.id}
    </button>
  );
}