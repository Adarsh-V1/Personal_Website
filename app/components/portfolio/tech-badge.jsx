import { cn } from "../../utils/cn";

export default function TechBadge({ label, isLotm, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200/80 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-teal-500/40 hover:bg-teal-500/8 hover:text-teal-700",
        isLotm &&
          "border-[#6f6148]/50 bg-[#161220] text-[#c9bead] hover:border-[#f0b85b]/40 hover:bg-[#1a2538] hover:text-[#f0b85b]",
        className,
      )}
    >
      {label}
    </span>
  );
}
