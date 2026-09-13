import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Eye, FilePlus2, Files, Pencil, Printer, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Column, DataTable } from "@/components/common/DataTable";
import { EmptyState } from "@/components/common/EmptyState";
import { FilterTabs } from "@/components/common/FilterTabs";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { controlClass } from "@/components/common/Field";
import { usePortalData } from "@/store/portal-data";
import type { Receipt } from "@/types";
import { paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR } from "@/utils/currency";
import { formatShortDate } from "@/utils/dateUtils";

export const Route = createFileRoute("/receipts/")({
  head: () => ({
    meta: [
      { title: "Receipts — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Search, filter and manage every internship and training payment receipt issued by MellowMoon SoftTech.",
      },
      { property: "og:title", content: "Receipts — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Search, filter and manage every internship and training payment receipt.",
      },
    ],
  }),
  component: ReceiptsPage,
});

type StatusFilter = "all" | "paid" | "pending";

function ReceiptsPage() {
  const { receipts, deleteReceipt } = usePortalData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [fromDate, setFromDate] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Receipt | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return receipts.filter((r) => {
      const matchesQuery =
        !q ||
        r.receiptNo.toLowerCase().includes(q) ||
        r.student.name.toLowerCase().includes(q);
      const status = paymentStatus(r.totalFee, r.amountPaid);
      const matchesFilter = filter === "all" || status === filter;
      const matchesDate = !fromDate || r.receiptDate >= fromDate;
      return matchesQuery && matchesFilter && matchesDate;
    });
  }, [receipts, query, filter, fromDate]);

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
    {
      key: "student",
      header: "Student",
      render: (r) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{r.student.name}</p>
          <p className="truncate text-xs text-muted-foreground">{r.student.email}</p>
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
      key: "actions",
      header: "Actions",
      align: "right",
      render: (r) => (
        <div className="flex items-center justify-end gap-1">
          <Link to="/receipts/$receiptId" params={{ receiptId: r.id }}>
            <Button variant="ghost" size="icon" aria-label={`View ${r.receiptNo}`} title="View">
              <Eye />
            </Button>
          </Link>
          <Link to="/create-receipt">
            <Button variant="ghost" size="icon" aria-label={`Edit ${r.receiptNo}`} title="Edit">
              <Pencil />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Print ${r.receiptNo}`}
            title="Print"
            onClick={() => toast.info("Open the receipt to print the A4 document.")}
          >
            <Printer />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Download ${r.receiptNo}`}
            title="Download"
            onClick={() => toast.info("Open the receipt and choose “Save as PDF”.")}
          >
            <Download />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/12"
            aria-label={`Delete ${r.receiptNo}`}
            title="Delete"
            onClick={() => setPendingDelete(r)}
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Receipts"
        subtitle={`${receipts.length} receipts in this session`}
        actions={
          <Link to="/create-receipt">
            <Button>
              <FilePlus2 />
              Create Receipt
            </Button>
          </Link>
        }
      />

      <section className="surface-panel overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:p-5">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search receipt number or student name…"
            label="Search receipts"
            className="sm:max-w-sm sm:flex-1"
          />
          <div className="flex flex-wrap items-center gap-3">
            <FilterTabs
              ariaLabel="Filter by payment status"
              value={filter}
              onChange={setFilter}
              options={[
                { value: "all", label: "All" },
                { value: "paid", label: "Paid" },
                { value: "pending", label: "Pending" },
              ]}
            />
            <div className="min-w-0">
              <label htmlFor="fromDate" className="sr-only">
                Receipts from date
              </label>
              <input
                id="fromDate"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className={`${controlClass} w-[10.5rem]`}
              />
            </div>
          </div>
        </div>

        <DataTable
          caption="All receipts"
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          empty={
            <EmptyState
              icon={Files}
              title="No receipts found"
              message="Create your first internship receipt to get started, or adjust the filters above."
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

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete receipt?"
        message={`${pendingDelete?.receiptNo ?? ""} will be removed from this session. Mock data resets on refresh.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            deleteReceipt(pendingDelete.id);
            toast.success(`${pendingDelete.receiptNo} deleted.`);
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
