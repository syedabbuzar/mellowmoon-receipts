import logo from "@/assets/mellowmoon-logo.png.asset.json";
import type { CompanyProfile, Receipt } from "@/types";
import { cn } from "@/lib/utils";
import { formatINR } from "@/utils/currency";
import { formatLongDate, formatShortDate } from "@/utils/dateUtils";
import { paymentStatus, pendingAmount } from "@/utils/calculations";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 gap-3 py-[5px]">
      <span className="w-[42%] shrink-0 text-[10.5px] font-semibold tracking-[0.04em] text-[var(--ink-muted)] uppercase">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-[12.5px] leading-snug font-medium break-words text-[var(--ink)]">
        {value || "—"}
      </span>
    </div>
  );
}

function SheetHeading({ children }: { children: string }) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <h3 className="text-[10.5px] font-bold tracking-[0.16em] text-[var(--ink)] uppercase">
        {children}
      </h3>
      <span className="h-px flex-1 bg-[var(--paper-line)]" />
    </div>
  );
}

function Money({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--paper-line)] py-1.5 last:border-0",
        emphasis && "border-b-0",
      )}
    >
      <span
        className={cn(
          "text-[12px] text-[var(--ink-muted)]",
          emphasis && "text-[12.5px] font-bold tracking-[0.04em] text-[var(--ink)] uppercase",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-[13px] font-semibold tabular-nums text-[var(--ink)]",
          emphasis && "text-[15px] font-bold",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function ReceiptPreview({
  receipt,
  company,
  className,
  printable = false,
}: {
  receipt: Receipt;
  company: CompanyProfile;
  className?: string;
  printable?: boolean;
}) {
  const pending = pendingAmount(receipt.totalFee, receipt.amountPaid);
  const status = paymentStatus(receipt.totalFee, receipt.amountPaid);
  const paid = status === "paid";

  return (
    <article
      {...(printable ? { id: "receipt-print-area" } : {})}
      className={cn(
        "receipt-sheet mx-auto w-full max-w-[794px] overflow-hidden rounded-lg border border-[var(--paper-line)] shadow-[var(--shadow-sheet)]",
        className,
      )}
      aria-label={`Payment receipt ${receipt.receiptNo}`}
    >
      <div
        aria-hidden
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg,#7a4b12,#e9c46a,#f6e3ad,#b9832b)" }}
      />

      <div className="px-7 pt-6 pb-7 sm:px-10 sm:pb-9">
        {/* Company header */}
        <header className="text-center">
          <img src={logo.url} alt="" className="mx-auto h-[64px] w-auto object-contain" />
          <h1 className="mt-1 font-display text-[22px] leading-tight font-bold tracking-[0.02em] text-[var(--ink)] uppercase">
            {company.name}
          </h1>
          <p className="mt-1.5 text-[11px] text-[var(--ink-muted)]">{company.address}</p>
          <p className="text-[11px] text-[var(--ink-muted)]">
            {company.email} &nbsp;|&nbsp; {company.phone}
          </p>
          <p className="text-[11px] text-[var(--ink-muted)]">
            {company.website} &nbsp;|&nbsp; CIN: {company.cin}
          </p>
        </header>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[var(--paper-line)]" />
          <span className="rounded-sm bg-[var(--ink)] px-4 py-1.5 text-[12px] font-bold tracking-[0.28em] text-white uppercase">
            Payment Receipt
          </span>
          <span className="h-px flex-1 bg-[var(--paper-line)]" />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-md bg-[oklch(0.97_0.01_90)] px-4 py-2.5">
          <p className="text-[12px] text-[var(--ink-muted)]">
            Receipt No:{" "}
            <span className="font-bold tracking-wide text-[var(--ink)]">
              {receipt.receiptNo || "MMST-2026-0000"}
            </span>
          </p>
          <p className="text-[12px] text-[var(--ink-muted)]">
            Receipt Date:{" "}
            <span className="font-bold text-[var(--ink)]">{formatLongDate(receipt.receiptDate)}</span>
          </p>
        </div>

        {/* Student + Program */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <section>
            <SheetHeading>Student Information</SheetHeading>
            <Row label="Student Name" value={receipt.student.name} />
            <Row label="College / University" value={receipt.student.college} />
            <Row label="Course / Degree" value={receipt.student.degree} />
            <Row label="Year / Semester" value={receipt.student.yearSemester} />
            <Row label="Email" value={receipt.student.email} />
            <Row label="Mobile" value={receipt.student.mobile} />
          </section>

          <section>
            <SheetHeading>Internship Information</SheetHeading>
            <Row label="Program" value={receipt.programType} />
            <Row label="Internship Course" value={receipt.course} />
            <Row label="Duration" value={receipt.duration} />
            <Row label="Start Date" value={formatShortDate(receipt.startDate)} />
            <Row label="End Date" value={formatShortDate(receipt.endDate)} />
            <Row label="Batch / Reference" value={receipt.batch} />
          </section>
        </div>

        {/* Payment */}
        <section className="mt-7">
          <SheetHeading>Payment Information</SheetHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Money label="Total Fee" value={formatINR(receipt.totalFee)} />
              <Money label="Amount Paid" value={formatINR(receipt.amountPaid)} />
              <Money label="Pending Amount" value={formatINR(pending)} emphasis />
            </div>
            <div>
              <Money label="Payment Mode" value={receipt.paymentMode || "—"} />
              <Money label="Transaction ID / UTR" value={receipt.transactionId || "—"} />
              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-[12.5px] font-bold tracking-[0.04em] text-[var(--ink)] uppercase">
                  Payment Status
                </span>
                <span
                  className={cn(
                    "rounded-sm border px-3 py-1 text-[11px] font-bold tracking-[0.16em] uppercase",
                    paid
                      ? "border-[oklch(0.6_0.13_155)] bg-[oklch(0.95_0.05_155)] text-[oklch(0.42_0.12_155)]"
                      : "border-[oklch(0.7_0.13_75)] bg-[oklch(0.96_0.06_85)] text-[oklch(0.48_0.12_70)]",
                  )}
                >
                  {paid ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-7 border-t border-[var(--paper-line)] pt-4 text-[11.5px] leading-relaxed text-[var(--ink-muted)]">
          Received with thanks towards {receipt.programType || "Training + Internship"} programme fees
          for {receipt.course || "the enrolled course"}. This receipt is issued electronically and is
          valid without a physical seal. Fees once paid are non-refundable and non-transferable.
        </p>

        <div className="mt-8 flex items-end justify-between gap-6">
          <div className="text-[10.5px] leading-relaxed text-[var(--ink-muted)]">
            <p>Computer generated receipt</p>
            <p>Generated on {formatLongDate(receipt.receiptDate)}</p>
          </div>
          <div className="text-center">
            <p className="text-[11.5px] font-semibold text-[var(--ink)]">
              For {company.name}
            </p>
            <div className="mt-9 w-[190px] border-t border-[var(--ink-muted)]" />
            <p className="mt-1.5 text-[10.5px] tracking-[0.1em] text-[var(--ink-muted)] uppercase">
              Authorized Signatory
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
