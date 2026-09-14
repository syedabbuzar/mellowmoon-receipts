import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, UserPlus, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/common/Button";
import { Column, DataTable } from "@/components/common/DataTable";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchBar } from "@/components/common/SearchBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { usePortalData } from "@/store/portal-data";
import type { Student } from "@/types";
import { paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR } from "@/utils/currency";

export const Route = createFileRoute("/students/")({
  head: () => ({
    meta: [
      { title: "Students — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Enrolled interns and trainees with college, course, fee totals and outstanding balance at a glance.",
      },
      { property: "og:title", content: "Students — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Enrolled interns and trainees with fee totals and outstanding balance.",
      },
    ],
  }),
  component: StudentsPage,
});

function StudentsPage() {
  const { students, receipts } = usePortalData();
  const [query, setQuery] = useState("");

  const enriched = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students
      .map((student) => {
        const own = receipts.filter((r) => r.student.email === student.email);
        const totalFee = own.reduce((sum, r) => sum + r.totalFee, 0);
        const paid = own.reduce((sum, r) => sum + r.amountPaid, 0);
        return {
          student,
          course: own[0]?.course ?? "—",
          totalFee,
          paid,
          pending: pendingAmount(totalFee, paid),
          status: paymentStatus(totalFee, paid),
        };
      })
      .filter(
        ({ student }) =>
          !q ||
          student.name.toLowerCase().includes(q) ||
          student.college.toLowerCase().includes(q) ||
          student.email.toLowerCase().includes(q),
      );
  }, [students, receipts, query]);

  type Row = (typeof enriched)[number];

  const columns: Column<Row>[] = [
    {
      key: "student",
      header: "Student",
      render: ({ student }) => (
        <Link
          to="/students/$studentId"
          params={{ studentId: student.id }}
          className="min-w-0 font-semibold text-gold hover:underline"
        >
          {student.name}
        </Link>
      ),
    },
    {
      key: "college",
      header: "College",
      render: ({ student }) => (
        <span className="line-clamp-2 max-w-[16rem] text-sm">{student.college}</span>
      ),
    },
    { key: "course", header: "Course", render: (r) => r.course },
    {
      key: "email",
      header: "Email",
      render: ({ student }) => (
        <span className="text-sm text-muted-foreground">{student.email}</span>
      ),
    },
    {
      key: "mobile",
      header: "Mobile",
      render: ({ student }) => <span className="whitespace-nowrap">{student.mobile}</span>,
    },
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
      render: (r) => <span className="tabular-nums text-success">{formatINR(r.paid)}</span>,
    },
    {
      key: "pending",
      header: "Pending",
      align: "right",
      render: (r) => <span className="tabular-nums text-warning">{formatINR(r.pending)}</span>,
    },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: ({ student }) => (
        <Link to="/students/$studentId" params={{ studentId: student.id }}>
          <Button variant="ghost" size="icon" aria-label={`View ${student.name}`} title="View">
            <Eye />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Students"
        subtitle={`${students.length} enrolled interns and trainees`}
        actions={
          <Button onClick={() => toast.info("Students are added automatically when a receipt is created.")}>
            <UserPlus />
            Add Student
          </Button>
        }
      />

      <section className="surface-panel overflow-hidden">
        <div className="border-b border-border p-4 sm:p-5">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search student…"
            label="Search students"
            className="sm:max-w-sm"
          />
        </div>
        <DataTable
          caption="Students"
          columns={columns}
          rows={enriched}
          rowKey={(r: Row) => r.student.id}
          empty={
            <EmptyState
              icon={Users}
              title="No students found"
              message="Students appear here once their first internship receipt is created."
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

export type { Student };
