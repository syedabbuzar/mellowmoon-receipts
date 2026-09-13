import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, GraduationCap, Hash, Save, UserRound, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/common/Button";
import { CurrencyInput } from "@/components/common/CurrencyInput";
import { Field, controlClass } from "@/components/common/Field";
import { Input } from "@/components/common/Input";
import { PageHeader, SectionCard } from "@/components/common/PageHeader";
import { Select } from "@/components/common/Select";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ReceiptPreview } from "@/components/receipt/ReceiptPreview";
import { ReceiptActions } from "@/components/receipt/ReceiptActions";
import { usePortalData } from "@/store/portal-data";
import type { PaymentMode, ReceiptFormValues } from "@/types";
import { nextReceiptNo, paymentStatus, pendingAmount } from "@/utils/calculations";
import { formatINR, parseAmount } from "@/utils/currency";
import { addMonths, formatShortDate } from "@/utils/dateUtils";
import { emptyForm, formToReceipt, validateForm, type FormErrors } from "@/utils/receipt";

export const Route = createFileRoute("/create-receipt")({
  head: () => ({
    meta: [
      { title: "Create Receipt — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Issue a training and internship payment receipt with a live A4 preview, fee calculation and payment status.",
      },
      { property: "og:title", content: "Create Receipt — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Issue an internship payment receipt with a live A4 preview and fee calculation.",
      },
    ],
  }),
  component: CreateReceipt,
});

const paymentModes: PaymentMode[] = ["UPI", "Cash", "Bank Transfer", "Other"];

function CreateReceipt() {
  const { company, settings, courses, programTypes, durations, receipts, addReceipt } =
    usePortalData();
  const navigate = useNavigate();

  const suggestedNo = useMemo(
    () => nextReceiptNo(settings.prefix, receipts.map((r) => r.receiptNo)),
    [settings.prefix, receipts],
  );

  const [values, setValues] = useState<ReceiptFormValues>(() => emptyForm(suggestedNo));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedDuration = durations.find((d) => d.label === values.duration);
  const isCustomDuration = !selectedDuration || selectedDuration.months === null;

  const set = <K extends keyof ReceiptFormValues>(key: K, value: ReceiptFormValues[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "duration" || key === "startDate") {
        const duration = durations.find((d) => d.label === next.duration);
        if (duration?.months && next.startDate) {
          next.endDate = addMonths(next.startDate, duration.months);
        } else if (duration && duration.months === null && key === "duration") {
          next.endDate = "";
        }
      }

      if (key === "paymentMode" && value !== "UPI" && value !== "Bank Transfer") {
        next.transactionId = "";
      }

      return next;
    });
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const { [key as string]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const total = parseAmount(values.totalFee);
  const paid = parseAmount(values.amountPaid);
  const pending = pendingAmount(total, paid);
  const status = paymentStatus(total, paid);
  const showTxn = values.paymentMode === "UPI" || values.paymentMode === "Bank Transfer";

  const previewReceipt = useMemo(() => formToReceipt(values), [values]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }

    setSubmitting(true);
    const receipt = formToReceipt(values, `rcp-${Date.now()}`);
    addReceipt(receipt);
    toast.success(`Receipt ${receipt.receiptNo} saved (session only — no backend connected).`);
    setSubmitting(false);
    void navigate({ to: "/receipts/$receiptId", params: { receiptId: receipt.id } });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Receipt"
        subtitle="Fill in the details on the left — the A4 receipt on the right updates instantly."
        actions={<ReceiptActions compact />}
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        {/* ------------- Form ------------- */}
        <form onSubmit={handleSubmit} className="no-print space-y-5" noValidate>
          <SectionCard title="Receipt Details" description="Generated by the portal">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="receiptNo"
                label="Receipt Number"
                hint="Auto-generated — the backend will own this."
              >
                <div className="relative">
                  <Hash
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gold"
                  />
                  <input
                    id="receiptNo"
                    readOnly
                    aria-readonly
                    value={values.receiptNo}
                    className={`${controlClass} cursor-default border-dashed bg-muted/60 pl-9 font-semibold tracking-wide text-gold`}
                  />
                </div>
              </Field>
              <Input
                id="receiptDate"
                label="Receipt Date"
                type="date"
                required
                value={values.receiptDate}
                onChange={(e) => set("receiptDate", e.target.value)}
                error={errors["receiptDate"]}
              />
            </div>
          </SectionCard>

          <SectionCard title="Student Information" step="1">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="studentName"
                label="Student Full Name"
                required
                placeholder="e.g. Aarav Deshmukh"
                value={values.studentName}
                onChange={(e) => set("studentName", e.target.value)}
                error={errors["studentName"]}
                fieldClassName="sm:col-span-2"
              />
              <Input
                id="college"
                label="College / University Name"
                required
                placeholder="e.g. SGGSIE&T, Nanded"
                value={values.college}
                onChange={(e) => set("college", e.target.value)}
                error={errors["college"]}
                fieldClassName="sm:col-span-2"
              />
              <Input
                id="degree"
                label="Course / Degree"
                required
                placeholder="e.g. B.Tech Computer Science"
                value={values.degree}
                onChange={(e) => set("degree", e.target.value)}
                error={errors["degree"]}
              />
              <Input
                id="yearSemester"
                label="Year / Semester"
                required
                placeholder="e.g. Final Year / Sem 7"
                value={values.yearSemester}
                onChange={(e) => set("yearSemester", e.target.value)}
                error={errors["yearSemester"]}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                required
                placeholder="student@example.com"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors["email"]}
              />
              <Input
                id="mobile"
                label="Mobile Number"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={values.mobile}
                onChange={(e) => set("mobile", e.target.value)}
                error={errors["mobile"]}
              />
            </div>
          </SectionCard>

          <SectionCard title="Internship Information" step="2">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                id="programType"
                label="Program Type"
                required
                value={values.programType}
                onChange={(e) => set("programType", e.target.value)}
                error={errors["programType"]}
                options={programTypes
                  .filter((p) => p.status === "active")
                  .map((p) => ({ value: p.name, label: p.name }))}
              />
              <Select
                id="course"
                label="Internship Course"
                required
                value={values.course}
                onChange={(e) => set("course", e.target.value)}
                error={errors["course"]}
                options={courses
                  .filter((c) => c.status === "active")
                  .map((c) => ({ value: c.name, label: c.name }))}
              />
              <Select
                id="duration"
                label="Duration"
                required
                value={values.duration}
                onChange={(e) => set("duration", e.target.value)}
                error={errors["duration"]}
                options={durations
                  .filter((d) => d.status === "active")
                  .map((d) => ({ value: d.label, label: d.label }))}
              />
              <Input
                id="batch"
                label="Batch / Reference"
                placeholder="e.g. AI-B12 / Ref-1187"
                value={values.batch}
                onChange={(e) => set("batch", e.target.value)}
              />
              <Input
                id="startDate"
                label="Start Date"
                type="date"
                required
                value={values.startDate}
                onChange={(e) => set("startDate", e.target.value)}
                error={errors["startDate"]}
              />
              <Input
                id="endDate"
                label="End Date"
                type="date"
                value={values.endDate}
                disabled={!isCustomDuration}
                onChange={(e) => set("endDate", e.target.value)}
                error={errors["endDate"]}
                hint={
                  isCustomDuration
                    ? "Enter the end date manually"
                    : "Calculated from duration"
                }
              />
            </div>

            {values.duration && values.startDate && (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-gold/25 bg-gold/6 px-4 py-3">
                <CalendarDays className="size-4 shrink-0 text-gold" aria-hidden />
                <p className="text-sm">
                  <span className="text-muted-foreground">Start Date: </span>
                  <span className="font-semibold">{formatShortDate(values.startDate)}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">End Date: </span>
                  <span className="font-semibold">
                    {values.endDate ? formatShortDate(values.endDate) : "—"}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">{values.duration}</p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Payment Information" step="3">
            <div className="grid gap-4 sm:grid-cols-2">
              <CurrencyInput
                id="totalFee"
                label="Total Fee"
                required
                value={values.totalFee}
                onValueChange={(v) => set("totalFee", v)}
                error={errors["totalFee"]}
              />
              <CurrencyInput
                id="amountPaid"
                label="Amount Paid"
                required
                value={values.amountPaid}
                onValueChange={(v) => set("amountPaid", v)}
                error={errors["amountPaid"]}
              />
              <CurrencyInput
                id="pendingAmount"
                label="Pending Amount"
                readOnly
                value={String(pending)}
                hint="Calculated automatically"
              />
              <Field id="paymentStatus" label="Payment Status" hint="Derived from the amounts above">
                <div className="flex h-10 items-center rounded-lg border border-dashed border-border bg-muted/60 px-3">
                  <StatusBadge status={status} />
                </div>
              </Field>
              <Select
                id="paymentMode"
                label="Payment Mode"
                value={values.paymentMode}
                onChange={(e) => set("paymentMode", e.target.value as PaymentMode)}
                options={paymentModes.map((m) => ({ value: m, label: m }))}
              />
              {showTxn && (
                <Input
                  id="transactionId"
                  label="Transaction ID / UTR"
                  required
                  placeholder="e.g. UPI4417829031"
                  value={values.transactionId}
                  onChange={(e) => set("transactionId", e.target.value)}
                  error={errors["transactionId"]}
                />
              )}
            </div>

            <dl className="mt-5 grid gap-3 rounded-lg border border-border bg-elevated/60 p-4 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  Total Fee
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold tabular-nums">
                  {formatINR(total)}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  Amount Paid
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-success">
                  {formatINR(paid)}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  Pending
                </dt>
                <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-warning">
                  {formatINR(pending)}
                </dd>
              </div>
            </dl>
          </SectionCard>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" disabled={submitting}>
              <Save />
              Save Receipt
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setValues(emptyForm(suggestedNo));
                setErrors({});
                toast.info("Form reset.");
              }}
            >
              Reset Form
            </Button>
          </div>
        </form>

        {/* ------------- Live preview ------------- */}
        <div className="xl:sticky xl:top-[88px]">
          <div className="no-print mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <h2 className="font-display text-xl font-semibold">Receipt Preview</h2>
            <p className="text-xs text-muted-foreground">
              Live A4 document · updates as you type
            </p>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[340px] origin-top scale-100 sm:min-w-0">
              <ReceiptPreview receipt={previewReceipt} company={company} printable />
            </div>
          </div>
          <div className="no-print mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="size-3.5 text-gold" />
              {values.studentName || "Student pending"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap className="size-3.5 text-gold" />
              {values.course || "Course pending"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Wallet className="size-3.5 text-gold" />
              {formatINR(paid)} of {formatINR(total)} collected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
