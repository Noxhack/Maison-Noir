"use client";
import SectionWrapper from "./SectionWrapper";
import ProductCard from "./ProductCard";
import { drinks } from "@/lib/data";

export default function Products() {
  return (
    <SectionWrapper
      id="menu"
      eyebrow="Le menu"
      title="Quatre signatures. Une obsession."
      intro="Chaque boisson est composée avec nos torréfacteurs pour révéler une facette du grain. Rien d'autre."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {drinks.map((d, i) => (
          <ProductCard key={d.id} drink={d} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
