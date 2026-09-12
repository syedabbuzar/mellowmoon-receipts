import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function SectionCard({
  title,
  step,
  description,
  children,
}: {
  title: string;
  step?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="surface-panel p-5 sm:p-6">
      <div className="flex items-center gap-3">
        {step && (
          <span className="grid size-7 shrink-0 place-items-center rounded-md border border-gold/30 bg-gold/8 text-xs font-bold text-gold">
            {step}
          </span>
        )}
        <div className="min-w-0">
          <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
