"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Sheet({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 mx-auto max-w-[520px] bg-cream rounded-t-[28px] shadow-lift flex flex-col overflow-hidden"
            style={{ maxHeight: "92vh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 140 || info.velocity.y > 600) onClose();
            }}
          >
            <div className="pt-3 pb-1 flex justify-center">
              <div className="h-1 w-10 rounded-full bg-espresso/15" />
            </div>

            {title !== undefined && (
              <div className="px-5 pt-1 pb-3 flex items-center justify-between">
                <h2 className="font-serif text-[22px] tracking-tight text-espresso">{title}</h2>
                <button
                  onClick={onClose}
                  className="h-9 w-9 rounded-full bg-espresso/5 flex items-center justify-center text-espresso/70 active:scale-95 transition"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>

            {footer && (
              <div className="border-t border-espresso/8 bg-cream/95 backdrop-blur-xl px-5 pt-4 pb-5 safe-bottom">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
