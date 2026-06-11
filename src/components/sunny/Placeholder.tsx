import type { ReactNode } from "react";

export function Placeholder({
  label,
  className = "",
  children,
  ratio = "aspect-[4/5]",
}: {
  label: string;
  className?: string;
  children?: ReactNode;
  ratio?: string;
}) {
  return (
    <div className={`placeholder-frame rounded-2xl ${ratio} ${className} flex items-center justify-center`}>
      <div className="absolute inset-6 rounded-xl border border-white/5" />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
        <div className="h-8 w-8 rounded-full border border-[var(--sage)]/40 flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--sage)] shadow-[0_0_10px_var(--sage)]" />
        </div>
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">{label}</span>
        {children}
      </div>
    </div>
  );
}