import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold tracking-[0.09em] text-muted-foreground uppercase"
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const controlClass =
  "h-10 w-full rounded-lg border border-border bg-input px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 hover:border-border-strong focus:border-gold focus:ring-2 focus:ring-gold/25 focus:outline-none disabled:cursor-not-allowed disabled:bg-muted/60 disabled:text-muted-foreground";

export const controlErrorClass = "border-destructive focus:border-destructive focus:ring-destructive/25";
