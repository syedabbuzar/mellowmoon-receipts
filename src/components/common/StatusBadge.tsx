import type { PaymentStatus, RecordStatus } from "@/types";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
  className,
}: {
  status: PaymentStatus;
  className?: string;
}) {
  const paid = status === "paid";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase",
        paid
          ? "border-success/35 bg-success/12 text-success"
          : "border-warning/35 bg-warning/12 text-warning",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", paid ? "bg-success" : "bg-warning")}
      />
      {paid ? "Paid" : "Pending"}
    </span>
  );
}

export function RecordStatusBadge({ status }: { status: RecordStatus }) {
  const active = status === "active";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase",
        active
          ? "border-success/35 bg-success/12 text-success"
          : "border-border-strong bg-elevated text-muted-foreground",
      )}
    >
      <span
        aria-hidden
        className={cn("size-1.5 rounded-full", active ? "bg-success" : "bg-muted-foreground")}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}
