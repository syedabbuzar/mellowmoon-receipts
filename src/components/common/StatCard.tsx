import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  caption?: string;
  tone?: "gold" | "success" | "warning" | "neutral";
}

const toneClass: Record<string, string> = {
  gold: "border-gold/25 bg-gold/8 text-gold",
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/25 bg-warning/10 text-warning",
  neutral: "border-border-strong bg-elevated text-muted-foreground",
};

export function StatCard({ label, value, icon: Icon, caption, tone = "neutral" }: StatCardProps) {
  return (
    <div className="group surface-panel relative overflow-hidden p-5 transition-colors hover:border-gold/30">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px gold-rule opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
          {label}
        </p>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg border", toneClass[tone])}>
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {caption && <p className="mt-1 text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}
