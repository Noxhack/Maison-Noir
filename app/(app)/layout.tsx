import { CartProvider } from "@/lib/cart";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="relative mx-auto max-w-[520px] min-h-screen overflow-x-hidden">
        {children}
      </div>
    </CartProvider>
  );
}
