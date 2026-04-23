"use client";
import SectionWrapper from "./SectionWrapper";
import { fullMenu } from "@/lib/data";

export default function Products() {
  return (
    <SectionWrapper
      id="menu"
      eyebrow="Le menu"
      title="Coffee, matcha, juices, sweets & savoury."
      intro="Une carte moderne pensée pour le quotidien : café de spécialité, boissons fraîches, options gourmandes et all-day food."
    >
      <div className="space-y-8">
        {fullMenu.map((category) => (
          <div key={category.name} className="rounded-2xl border border-mocha/10 bg-cream p-5 md:p-6">
            <h3 className="font-serif text-2xl text-espresso mb-4">{category.name}</h3>

            <div className="grid gap-3">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border border-mocha/10 bg-white/60 px-4 py-3"
                >
                  <span className="text-sm md:text-base text-espresso">{item.name}</span>
                  <span className="text-sm md:text-base text-mocha/70 tabular-nums">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}