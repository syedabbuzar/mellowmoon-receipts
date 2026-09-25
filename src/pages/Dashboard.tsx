import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeIndianRupee,
  CircleCheck,
  Clock3,
  FilePlus2,
  Files,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/common/Button";
import { Column, DataTable } from "@/components/common/DataTable";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatCard } from "@/components/common/StatCard";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockPortfolioStats } from "@/mock/receipts";
import { useReceipts } from "@/hooks/useReceipts";
import type { Receipt } from "@/types";
import { paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR } from "@/utils/currency";
import { formatShortDate } from "@/utils/dateUtils";


export default function Dashboard() {
  const { receipts } = useReceipts();
  const stats = mockPortfolioStats;
  const recent = receipts.slice(0, 5);

  const columns: Column<Receipt>[] = [
    {
      key: "receiptNo",
      header: "Receipt No.",
      render: (r) => (
        <Link
          to="/receipts/$receiptId"
          params={{ receiptId: r.id }}
          className="font-semibold text-gold hover:underline"
        >
          {r.receiptNo}
        </Link>
      ),
    },
    {
      key: "student",
      header: "Student",
      render: (r) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{r.student.name}</p>
          <p className="truncate text-xs text-muted-foreground">{r.student.college}</p>
        </div>
      ),
    },
    { key: "course", header: "Course", render: (r) => r.course },
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
      key: "pending",
      header: "Pending",
      align: "right",
      render: (r) => (
        <span className="tabular-nums text-warning">
          {formatINR(pendingAmount(r.totalFee, r.amountPaid))}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge status={paymentStatus(r.totalFee, r.amountPaid)} />,
    },
    {
      key: "date",
      header: "Date",
      render: (r) => <span className="whitespace-nowrap">{formatShortDate(r.receiptDate)}</span>,
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      render: (r) => (
        <Link to="/receipts/$receiptId" params={{ receiptId: r.id }}>
          <Button variant="subtle" size="sm">
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin"
        actions={
          <Link to="/create-receipt">
            <Button>
              <FilePlus2 />
              Create Receipt
            </Button>
          </Link>
        }
      />

      <section aria-label="Receipt counts" className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Receipts"
          value={String(stats.totalReceipts)}
          icon={Files}
          tone="gold"
          caption="All programmes, FY 2026–27"
        />
        <StatCard
          label="Paid Receipts"
          value={String(stats.paidReceipts)}
          icon={CircleCheck}
          tone="success"
          caption="Fees fully settled"
        />
        <StatCard
          label="Pending Receipts"
          value={String(stats.pendingReceipts)}
          icon={Clock3}
          tone="warning"
          caption="Awaiting balance payment"
        />
      </section>

      <section aria-label="Fee collection" className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Fee"
          value={formatINR(stats.totalFee)}
          icon={BadgeIndianRupee}
          tone="gold"
          caption="Value of issued receipts"
        />
        <StatCard
          label="Collected"
          value={formatINR(stats.totalCollected)}
          icon={TrendingUp}
          tone="success"
          caption="78% of total fee"
        />
        <StatCard
          label="Pending"
          value={formatINR(stats.totalPending)}
          icon={Wallet}
          tone="warning"
          caption="22% outstanding"
        />
      </section>

      <section className="surface-panel overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-5 py-4 sm:flex sm:justify-between sm:px-6">
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold">Recent Receipts</h2>
            <p className="text-xs text-muted-foreground">Latest receipts issued by the portal</p>
          </div>
          <Link to="/receipts">
            <Button variant="outline" size="sm">
              View All Receipts
              <ArrowRight />
            </Button>
          </Link>
        </div>
        <DataTable
          caption="Recent receipts"
          columns={columns}
          rows={recent}
          rowKey={(r) => r.id}
          empty={
            <EmptyState
              icon={Files}
              title="No receipts found"
              message="Create your first internship receipt to get started."
              action={
                <Link to="/create-receipt">
                  <Button>
                    <FilePlus2 />
                    Create Receipt
                  </Button>
                </Link>
              }
            />
          }
        />
      </section>
    </div>
  );
}
