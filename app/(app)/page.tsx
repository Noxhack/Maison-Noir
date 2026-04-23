"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuTabs from "@/components/MenuTabs";
import MenuList from "@/components/MenuList";
import ProductSheet from "@/components/ProductSheet";
import CartBar from "@/components/CartBar";
import CartSheet from "@/components/CartSheet";
import CheckoutSheet from "@/components/CheckoutSheet";
import SuccessSheet from "@/components/SuccessSheet";
import { menu, type MenuItem } from "@/lib/menu";

export default function Home() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const tableNumber = "12";

  return (
    <>
      <Navbar tableNumber={tableNumber} />
      <main>
        <Hero />
        <MenuTabs categories={menu} />
        <MenuList categories={menu} onSelect={(item) => setSelected(item)} />
      </main>

      <CartBar onOpen={() => setCartOpen(true)} />

      <ProductSheet
        item={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />

      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setTimeout(() => setCheckoutOpen(true), 200);
        }}
      />

      <CheckoutSheet
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        initialTable={tableNumber}
        onSuccess={(ref) => {
          setCheckoutOpen(false);
          setTimeout(() => setSuccessRef(ref), 200);
        }}
      />

      <SuccessSheet
        open={!!successRef}
        onClose={() => setSuccessRef(null)}
        reference={successRef ?? ""}
      />
    </>
  );
}
