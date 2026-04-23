"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartLine = {
  id: string;
  itemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  options?: { label: string; value: string; delta?: number }[];
  note?: string;
};

type CartContextValue = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "id">) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((line: Omit<CartLine, "id">) => {
    setLines((prev) => {
      const signature = JSON.stringify({
        itemId: line.itemId,
        options: line.options ?? [],
        note: line.note ?? "",
      });
      const existing = prev.find(
        (l) => JSON.stringify({ itemId: l.itemId, options: l.options ?? [], note: l.note ?? "" }) === signature
      );
      if (existing) {
        return prev.map((l) => (l.id === existing.id ? { ...l, quantity: l.quantity + line.quantity } : l));
      }
      return [...prev, { ...line, id: `${line.itemId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, quantity } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    return lines.reduce(
      (acc, l) => {
        acc.count += l.quantity;
        acc.subtotal += l.unitPrice * l.quantity;
        return acc;
      },
      { count: 0, subtotal: 0 }
    );
  }, [lines]);

  const value = useMemo(
    () => ({ lines, add, remove, setQuantity, clear, count, subtotal }),
    [lines, add, remove, setQuantity, clear, count, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatPrice = (v: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: v % 1 === 0 ? 0 : 2 }).format(v);
