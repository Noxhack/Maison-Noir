"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Sheet from "./Sheet";

export default function SuccessSheet({
  open,
  onClose,
  reference,
}: {
  open: boolean;
  onClose: () => void;
  reference: string;
}) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      footer={
        <button
          onClick={onClose}
          className="w-full h-[52px] rounded-full bg-espresso text-cream font-medium text-[14px] tracking-wide active:scale-[0.99] transition"
        >
          Back to menu
        </button>
      }
    >
      <div className="px-5 pt-2 pb-8 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
          className="mx-auto h-16 w-16 rounded-full bg-wayne flex items-center justify-center"
        >
          <Check className="h-7 w-7 text-white" strokeWidth={3} />
        </motion.div>
        <h3 className="mt-5 font-serif text-[26px] tracking-tight">Order sent!</h3>
        <p className="mt-2 text-[13.5px] text-espresso/60 leading-relaxed">
          Your order is being prepared by the barista. Sit tight — it will be brought to your table shortly.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 h-9 rounded-full bg-espresso/6">
          <span className="text-[11px] uppercase tracking-widest text-espresso/50">Reference</span>
          <span className="text-[13px] font-semibold tabular-nums">{reference}</span>
        </div>
      </div>
    </Sheet>
  );
}
