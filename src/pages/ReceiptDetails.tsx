import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft, Files, Pencil } from "lucide-react";

import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReceiptActions } from "@/components/receipt/ReceiptActions";
import { ReceiptPreview } from "@/components/receipt/ReceiptPreview";
import { useReceipts } from "@/hooks/useReceipts";
import { useSettings } from "@/hooks/useSettings";
import { paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR } from "@/utils/currency";
import { formatLongDate, formatShortDate } from "@/utils/dateUtils";


function InfoBlock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <section className="surface-panel p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] gap-3">
            <dt className="text-[11px] font-semibold tracking-[0.07em] text-muted-foreground uppercase">
              {row.label}
            </dt>
            <dd className="min-w-0 text-sm break-words">{row.value || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function ReceiptDetails() {
  const { receiptId } = useParams({ from: "/receipts/$receiptId" });
  const { receipts } = useReceipts();
  const { company } = useSettings();
  const receipt = receipts.find((r) => r.id === receiptId);

  if (!receipt) {
    return (
      <div className="surface-panel">
        <EmptyState
          icon={Files}
          title="Receipt not available"
          message="This receipt isn't in the current session. Mock data resets on refresh."
          action={
            <Link to="/receipts">
              <Button>
                <ArrowLeft />
                Back to receipts
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const pending = pendingAmount(receipt.totalFee, receipt.amountPaid);
  const status = paymentStatus(receipt.totalFee, receipt.amountPaid);

  return (
    <div className="space-y-6">
      <div className="no-print">
        <Link
          to="/receipts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All receipts
        </Link>
      </div>

      <div className="no-print">
        <PageHeader
          title={receipt.receiptNo}
          subtitle={`Issued on ${formatLongDate(receipt.receiptDate)} · ${receipt.programType}`}
          actions={
            <>
              <Link to="/create-receipt">
                <Button variant="subtle">
                  <Pencil />
                  Edit Receipt
                </Button>
              </Link>
              <ReceiptActions />
            </>
          }
        />
      </div>

      <div className="no-print grid gap-4 lg:grid-cols-3">
        <InfoBlock
          title="Receipt Information"
          rows={[
            { label: "Receipt No.", value: receipt.receiptNo },
            { label: "Receipt Date", value: formatLongDate(receipt.receiptDate) },
            { label: "Program", value: receipt.programType },
            { label: "Batch / Ref", value: receipt.batch },
          ]}
        />
        <InfoBlock
          title="Student Information"
          rows={[
            { label: "Name", value: receipt.student.name },
            { label: "College", value: receipt.student.college },
            { label: "Course / Degree", value: receipt.student.degree },
            { label: "Year / Sem", value: receipt.student.yearSemester },
            { label: "Email", value: receipt.student.email },
            { label: "Mobile", value: receipt.student.mobile },
          ]}
        />
        <InfoBlock
          title="Internship Information"
          rows={[
            { label: "Course", value: receipt.course },
            { label: "Duration", value: receipt.duration },
            { label: "Start Date", value: formatShortDate(receipt.startDate) },
            { label: "End Date", value: formatShortDate(receipt.endDate) },
          ]}
        />
      </div>

      <section className="no-print surface-panel p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">Payment Information</h2>
          <StatusBadge status={status} />
        </div>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Fee", value: formatINR(receipt.totalFee), tone: "text-foreground" },
            { label: "Amount Paid", value: formatINR(receipt.amountPaid), tone: "text-success" },
            { label: "Pending", value: formatINR(pending), tone: "text-warning" },
            { label: "Payment Mode", value: receipt.paymentMode, tone: "text-foreground" },
            {
              label: "Transaction ID",
              value: receipt.transactionId || "—",
              tone: "text-foreground",
            },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-elevated/60 p-4">
              <dt className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                {item.label}
              </dt>
              <dd
                className={`mt-1.5 font-display text-xl font-semibold break-words tabular-nums ${item.tone}`}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="no-print mb-3 font-display text-lg font-semibold">Receipt Document</h2>
        <div className="overflow-x-auto pb-2">
          <ReceiptPreview receipt={receipt} company={company} printable />
        </div>
      </section>
    </div>
  );
}
