import type { PaymentStatus, Receipt } from "@/types";

export function pendingAmount(totalFee: number, amountPaid: number): number {
  return Math.max(0, Math.round((totalFee - amountPaid) * 100) / 100);
}

export function paymentStatus(totalFee: number, amountPaid: number): PaymentStatus {
  return totalFee > 0 && amountPaid >= totalFee ? "paid" : "pending";
}

export interface ReceiptTotals {
  totalReceipts: number;
  paidReceipts: number;
  pendingReceipts: number;
  totalFee: number;
  totalCollected: number;
  totalPending: number;
}

export function summarize(receipts: Receipt[]): ReceiptTotals {
  return receipts.reduce<ReceiptTotals>(
    (acc, r) => {
      const status = paymentStatus(r.totalFee, r.amountPaid);
      acc.totalReceipts += 1;
      if (status === "paid") acc.paidReceipts += 1;
      else acc.pendingReceipts += 1;
      acc.totalFee += r.totalFee;
      acc.totalCollected += r.amountPaid;
      acc.totalPending += pendingAmount(r.totalFee, r.amountPaid);
      return acc;
    },
    {
      totalReceipts: 0,
      paidReceipts: 0,
      pendingReceipts: 0,
      totalFee: 0,
      totalCollected: 0,
      totalPending: 0,
    },
  );
}

/** Mock next receipt number — the backend will own this later. */
export function nextReceiptNo(prefix: string, existing: string[]): string {
  const year = new Date().getFullYear();
  const seqs = existing
    .map((no) => Number.parseInt(no.split("-").pop() ?? "0", 10))
    .filter((n) => Number.isFinite(n));
  const next = (seqs.length ? Math.max(...seqs) : 0) + 1;
  return `${prefix}-${year}-${String(next).padStart(4, "0")}`;
}
