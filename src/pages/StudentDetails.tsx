import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft, Users } from "lucide-react";

import { Button } from "@/components/common/Button";
import { Column, DataTable } from "@/components/common/DataTable";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useStudents } from "@/hooks/useStudents";
import { useReceipts } from "@/hooks/useReceipts";
import type { Receipt } from "@/types";
import { paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR } from "@/utils/currency";
import { formatShortDate } from "@/utils/dateUtils";
import { BadgeIndianRupee, TrendingUp, Wallet } from "lucide-react";


export default function StudentDetails() {
  const { studentId } = useParams({ from: "/students/$studentId" });
  const { students } = useStudents();
  const { receipts } = useReceipts();
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="surface-panel">
        <EmptyState
          icon={Users}
          title="Student not available"
          message="This student isn't in the current session. Mock data resets on refresh."
          action={
            <Link to="/students">
              <Button>
                <ArrowLeft />
                Back to students
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const history = receipts.filter((r) => r.student.email === student.email);
  const totalFee = history.reduce((sum, r) => sum + r.totalFee, 0);
  const paid = history.reduce((sum, r) => sum + r.amountPaid, 0);
  const pending = pendingAmount(totalFee, paid);
  const status = paymentStatus(totalFee, paid);

  const columns: Column<Receipt>[] = [
    {
      key: "receiptNo",
      header: "Receipt No.",
      render: (r) => (
        <Link
          to="/receipts/$receiptId"
          params={{ receiptId: r.id }}
          className="font-semibold whitespace-nowrap text-gold hover:underline"
        >
          {r.receiptNo}
        </Link>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (r) => <span className="whitespace-nowrap">{formatShortDate(r.receiptDate)}</span>,
    },
    { key: "course", header: "Course", render: (r) => r.course },
    { key: "duration", header: "Duration", render: (r) => r.duration },
    {
      key: "total",
      header: "Total Fee",
      align: "right",
      render: (r) => <span className="tabular-nums">{formatINR(r.totalFee)}</span>,
    },
    {
      key: "paid",
      header: "Paid",
      align: "right",
      render: (r) => <span className="tabular-nums text-success">{formatINR(r.amountPaid)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={paymentStatus(r.totalFee, r.amountPaid)} />,
    },
  ];

  return (
    <div className="space-y-6">
      <Link
        to="/students"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All students
      </Link>

      <PageHeader title={student.name} subtitle={student.college} />

      <section className="surface-panel p-5">
        <h2 className="font-display text-lg font-semibold">Student Profile</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Student Name", value: student.name },
            { label: "College", value: student.college },
            { label: "Course / Degree", value: student.degree },
            { label: "Year / Semester", value: student.yearSemester },
            { label: "Email", value: student.email },
            { label: "Mobile", value: student.mobile },
          ].map((row) => (
            <div key={row.label} className="min-w-0">
              <dt className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm break-words">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Payment summary" className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Fee" value={formatINR(totalFee)} icon={BadgeIndianRupee} tone="gold" />
        <StatCard label="Paid" value={formatINR(paid)} icon={TrendingUp} tone="success" />
        <StatCard label="Pending" value={formatINR(pending)} icon={Wallet} tone="warning" />
      </section>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Overall payment status</span>
        <StatusBadge status={status} />
      </div>

      <section className="surface-panel overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Receipt History</h2>
        </div>
        <DataTable
          caption="Receipt history"
          columns={columns}
          rows={history}
          rowKey={(r) => r.id}
          empty={
            <EmptyState
              icon={Users}
              title="No receipts yet"
              message="This student has no receipts in the current session."
              action={
                <Link to="/create-receipt">
                  <Button>Create Receipt</Button>
                </Link>
              }
            />
          }
        />
      </section>
    </div>
  );
}
