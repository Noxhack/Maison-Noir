import clsx from "clsx";

export default function Logo({ className, tracking = "0.32em" }: { className?: string; tracking?: string }) {
  return (
    <span
      className={clsx("font-sans font-bold uppercase select-none", className)}
      style={{ letterSpacing: tracking }}
    >
      WAYNE
    </span>
  );
}
