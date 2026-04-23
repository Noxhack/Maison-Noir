"use client";
import { useMemo, useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import clsx from "clsx";
import Sheet from "./Sheet";
import { formatPrice, useCart } from "@/lib/cart";
import type { MenuItem } from "@/lib/menu";
import { sizeOptions, milkOptions, extraOptions } from "@/lib/menu";

export default function ProductSheet({
  item,
  open,
  onClose,
}: {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [variantIdx, setVariantIdx] = useState(0);
  const [sizeId, setSizeId] = useState("M");
  const [milkId, setMilkId] = useState("whole");
  const [extras, setExtras] = useState<string[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setVariantIdx(0);
      setSizeId("M");
      setMilkId("whole");
      setExtras([]);
      setNote("");
    }
  }, [open, item?.id]);

  const basePrice = useMemo(() => {
    if (!item) return 0;
    if (item.variants) return item.variants[variantIdx]?.price ?? 0;
    return item.price ?? 0;
  }, [item, variantIdx]);

  const customizable = !!item?.customizable;

  const unitPrice = useMemo(() => {
    let p = basePrice;
    if (customizable) {
      p += sizeOptions.find((s) => s.id === sizeId)?.delta ?? 0;
      p += milkOptions.find((m) => m.id === milkId)?.delta ?? 0;
      p += extras.reduce((sum, id) => sum + (extraOptions.find((e) => e.id === id)?.delta ?? 0), 0);
    }
    return p;
  }, [basePrice, customizable, sizeId, milkId, extras]);

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));

  const handleAdd = () => {
    if (!item) return;
    const options: { label: string; value: string }[] = [];
    if (item.variants) options.push({ label: "Size", value: item.variants[variantIdx].label });
    if (customizable) {
      options.push({ label: "Size", value: sizeOptions.find((s) => s.id === sizeId)!.label });
      const milk = milkOptions.find((m) => m.id === milkId)!;
      if (milk.id !== "whole") options.push({ label: "Milk", value: milk.label });
      extras.forEach((id) => {
        const e = extraOptions.find((x) => x.id === id);
        if (e) options.push({ label: "Extra", value: e.label });
      });
    }
    add({
      itemId: item.id,
      name: item.name,
      unitPrice,
      quantity,
      options,
      note: note.trim() || undefined,
    });
    onClose();
  };

  return (
    <Sheet
      open={open && !!item}
      onClose={onClose}
      title={item?.name}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex items-center h-12 rounded-full bg-espresso/6 px-1.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-9 w-9 rounded-full flex items-center justify-center text-espresso/70 active:scale-95"
              aria-label="Decrease"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-7 text-center text-[15px] font-semibold tabular-nums">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-9 w-9 rounded-full flex items-center justify-center text-espresso/70 active:scale-95"
              aria-label="Increase"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 h-12 rounded-full bg-espresso text-cream font-medium text-[14px] tracking-wide flex items-center justify-between px-5 active:scale-[0.98] transition"
          >
            <span>Add to order</span>
            <span className="tabular-nums">{formatPrice(unitPrice * quantity)}</span>
          </button>
        </div>
      }
    >
      <div className="px-5 pb-6">
        {item?.description && (
          <p className="text-[13.5px] text-espresso/65 leading-relaxed mb-5">{item.description}</p>
        )}

        {item?.variants && (
          <Section label="Size">
            <div className="grid grid-cols-2 gap-2">
              {item.variants.map((v, i) => (
                <Chip key={v.label} active={variantIdx === i} onClick={() => setVariantIdx(i)}>
                  <span>{v.label}</span>
                  <span className="text-espresso/50 text-[12px]">{formatPrice(v.price)}</span>
                </Chip>
              ))}
            </div>
          </Section>
        )}

        {customizable && (
          <>
            <Section label="Size">
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((s) => (
                  <Chip key={s.id} active={sizeId === s.id} onClick={() => setSizeId(s.id)}>
                    <span>{s.label}</span>
                    <span className="text-espresso/50 text-[12px]">
                      {s.delta > 0 ? `+${formatPrice(s.delta)}` : "—"}
                    </span>
                  </Chip>
                ))}
              </div>
            </Section>

            <Section label="Milk">
              <div className="grid grid-cols-2 gap-2">
                {milkOptions.map((m) => (
                  <Chip key={m.id} active={milkId === m.id} onClick={() => setMilkId(m.id)}>
                    <span>{m.label}</span>
                    <span className="text-espresso/50 text-[12px]">
                      {m.delta > 0 ? `+${formatPrice(m.delta)}` : "—"}
                    </span>
                  </Chip>
                ))}
              </div>
            </Section>

            <Section label="Extras">
              <div className="grid grid-cols-2 gap-2">
                {extraOptions.map((e) => (
                  <Chip key={e.id} active={extras.includes(e.id)} onClick={() => toggleExtra(e.id)}>
                    <span>{e.label}</span>
                    <span className="text-espresso/50 text-[12px]">+{formatPrice(e.delta)}</span>
                  </Chip>
                ))}
              </div>
            </Section>
          </>
        )}

        <Section label="Note for the barista">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="e.g. less sugar, oat milk only"
            className="w-full rounded-2xl bg-espresso/5 border border-espresso/8 p-3.5 text-[13.5px] placeholder:text-espresso/35 focus:outline-none focus:border-espresso/30 transition resize-none"
          />
        </Section>
      </div>
    </Sheet>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-espresso/45 mb-2">{label}</div>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "h-12 px-3.5 rounded-2xl border text-[13.5px] font-medium flex items-center justify-between gap-2 transition-all active:scale-[0.98]",
        active
          ? "bg-espresso text-cream border-espresso shadow-soft"
          : "bg-cream border-espresso/10 text-espresso hover:border-espresso/25"
      )}
    >
      {children}
    </button>
  );
}
