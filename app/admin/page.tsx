"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Order, OrderStatus } from "@/lib/supabase";
import { formatPrice } from "@/lib/cart";
import clsx from "clsx";

const ADMIN_SECRET = "wayne2024";

const STATUS: Record<OrderStatus, { label: string; dot: string; bg: string; text: string; next?: OrderStatus; cta?: string }> = {
  pending:   { label: "New",       dot: "bg-amber-400",   bg: "bg-amber-400/12",  text: "text-amber-600",  next: "preparing", cta: "Start preparing" },
  preparing: { label: "Preparing", dot: "bg-blue-400",    bg: "bg-blue-400/12",   text: "text-blue-600",   next: "ready",     cta: "Mark as ready ✓" },
  ready:     { label: "Ready",     dot: "bg-emerald-400", bg: "bg-emerald-400/12",text: "text-emerald-600",next: "done",      cta: "Delivered — done" },
  done:      { label: "Done",      dot: "bg-espresso/25", bg: "bg-espresso/5",    text: "text-espresso/40" },
};

const PAYMENT_ICONS: Record<string, string> = { apple: "󰀹", card: "💳", counter: "🏪" };
const PAYMENT_LABELS: Record<string, string> = { apple: "Apple Pay", card: "Card", counter: "Counter" };

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // Refresh relative times every 30s
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { if (data) setOrders(data as Order[]); setLoading(false); });

    const channel = supabase
      .channel("admin-orders-v2")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        const o = payload.new as Order;
        supabase.from("order_items").select("*").eq("order_id", o.id).then(({ data }) => {
          setOrders((prev) => [{ ...o, order_items: data ?? [] }, ...prev]);
        });
        try { new Audio("/notify.mp3").play(); } catch {}
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" }, (payload) => {
        setOrders((prev) => prev.map((o) => o.id === payload.new.id ? { ...o, ...payload.new } : o));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const stats = useMemo(() => {
    const today = orders.filter((o) => {
      const d = new Date(o.created_at);
      const now = new Date();
      return d.getDate() === now.getDate() && d.getMonth() === now.getMonth();
    });
    return {
      total: today.length,
      revenue: today.reduce((s, o) => s + Number(o.subtotal), 0),
      active: orders.filter((o) => o.status === "pending" || o.status === "preparing").length,
      avg: today.length ? today.reduce((s, o) => s + Number(o.subtotal), 0) / today.length : 0,
    };
  }, [orders]);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const counts = orders.reduce((a, o) => { a[o.status] = (a[o.status] ?? 0) + 1; return a; }, {} as Record<string, number>);

  const updateStatus = async (id: string, status: OrderStatus) => {
    setUpdatingId(id);
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);
  };

  return (
    <div className="min-h-screen bg-cream font-sans text-espresso pb-10">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-cream/92 backdrop-blur-xl border-b border-espresso/8">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-wayne flex items-center justify-center shadow-soft">
              <span className="text-[9px] font-bold text-white tracking-widest">W</span>
            </div>
            <div>
              <div className="text-[12px] font-bold tracking-[0.22em] uppercase">WAYNE</div>
              <div className="text-[9px] text-espresso/40 tracking-widest uppercase -mt-0.5">Barista</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {stats.active > 0 && (
              <motion.div
                key={stats.active}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-amber-100 border border-amber-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-amber-700">{stats.active} active</span>
              </motion.div>
            )}
            <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-emerald-700">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-5 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today's orders", value: stats.total.toString(), sub: "all time" },
            { label: "Revenue today", value: formatPrice(stats.revenue), sub: "incl. service" },
            { label: "Avg order", value: stats.avg > 0 ? formatPrice(stats.avg) : "—", sub: "per customer" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-espresso/8 p-3 shadow-soft"
            >
              <div className="font-serif text-[22px] tabular-nums leading-none">{s.value}</div>
              <div className="text-[11px] font-medium text-espresso/80 mt-1">{s.label}</div>
              <div className="text-[10px] text-espresso/35 mt-0.5">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
          {(["all", "pending", "preparing", "ready", "done"] as const).map((s) => {
            const cfg = s !== "all" ? STATUS[s] : null;
            const count = s === "all" ? orders.length : (counts[s] ?? 0);
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx(
                  "shrink-0 h-8 px-3.5 rounded-full text-[12px] font-medium transition-all flex items-center gap-1.5",
                  filter === s ? "bg-espresso text-cream" : "bg-espresso/6 text-espresso/60 hover:text-espresso"
                )}
              >
                {cfg && <span className={clsx("h-1.5 w-1.5 rounded-full", cfg.dot)} />}
                {s === "all" ? "All" : cfg!.label}
                <span className="opacity-50 text-[10px]">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Orders list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 rounded-full border-2 border-espresso/20 border-t-espresso animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-3xl mb-3">☕</div>
            <div className="text-[14px] text-espresso/50">No orders yet. Waiting for the first scan.</div>
          </div>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {filtered.map((order) => {
                const cfg = STATUS[order.status];
                return (
                  <motion.li
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="bg-white rounded-2xl border border-espresso/8 shadow-soft overflow-hidden">

                      {/* Status bar */}
                      <div className={clsx("px-4 py-2 flex items-center justify-between", cfg.bg)}>
                        <div className="flex items-center gap-2">
                          <span className={clsx("h-2 w-2 rounded-full", cfg.dot)} />
                          <span className={clsx("text-[12px] font-semibold", cfg.text)}>{cfg.label}</span>
                        </div>
                        <span className="text-[11px] text-espresso/40 font-mono">{timeAgo(order.created_at)}</span>
                      </div>

                      <div className="p-4">
                        {/* Order header */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[16px]">{order.name}</span>
                              <span className="h-1 w-1 rounded-full bg-espresso/20" />
                              <span className="text-[13px] text-espresso/60">Table {order.table_number}</span>
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-espresso/45">
                              <span>{PAYMENT_LABELS[order.payment] ?? order.payment}</span>
                              <span className="font-mono text-[10px]">· {order.reference}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-serif text-[22px] leading-none tabular-nums">{formatPrice(Number(order.subtotal))}</div>
                            <div className="text-[11px] text-espresso/40 mt-0.5">{(order.order_items ?? []).reduce((s, i) => s + i.quantity, 0)} items</div>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-1.5 bg-espresso/3 rounded-xl p-3 mb-3">
                          {(order.order_items ?? []).map((item) => (
                            <div key={item.id} className="flex items-start gap-2.5 text-[13px]">
                              <span className="h-5 w-5 rounded-full bg-espresso text-cream flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                {item.quantity}
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="font-medium">{item.name}</span>
                                {item.options?.length > 0 && (
                                  <span className="text-espresso/50"> · {item.options.map((o: {label:string;value:string}) => o.value).join(", ")}</span>
                                )}
                                {item.note && <div className="text-[11px] italic text-espresso/40 mt-0.5">"{item.note}"</div>}
                              </div>
                              <span className="text-[12px] text-espresso/50 tabular-nums shrink-0">{formatPrice(item.unit_price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action */}
                        {cfg.next && (
                          <button
                            onClick={() => updateStatus(order.id, cfg.next!)}
                            disabled={updatingId === order.id}
                            className="w-full h-10 rounded-xl bg-espresso text-cream text-[13px] font-medium active:scale-[0.99] transition-all disabled:opacity-40 hover:bg-mocha"
                          >
                            {updatingId === order.id ? (
                              <span className="flex items-center justify-center gap-2">
                                <span className="h-3.5 w-3.5 rounded-full border-2 border-cream/30 border-t-cream animate-spin" />
                                Updating…
                              </span>
                            ) : cfg.cta}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
