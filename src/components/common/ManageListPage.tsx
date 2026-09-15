import type { LucideIcon } from "lucide-react";
import { Pencil, Plus, Power, PowerOff, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "./Button";
import { ConfirmDialog } from "./ConfirmDialog";
import { Column, DataTable } from "./DataTable";
import { EmptyState } from "./EmptyState";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { PageHeader } from "./PageHeader";
import { SearchBar } from "./SearchBar";
import { RecordStatusBadge } from "./StatusBadge";
import { Select } from "./Select";
import type { RecordStatus } from "@/types";
import { formatShortDate } from "@/utils/dateUtils";

export interface ManagedItem {
  id: string;
  name: string;
  status: RecordStatus;
  createdAt: string;
  /** Optional numeric months, used by Durations. */
  months?: number | null;
}

interface ManageListPageProps {
  title: string;
  subtitle: string;
  itemNoun: string;
  nameLabel: string;
  namePlaceholder: string;
  icon: LucideIcon;
  withMonths?: boolean;
  items: ManagedItem[];
  onChange: (updater: (items: ManagedItem[]) => ManagedItem[]) => void;
}

/**
 * Shared CRUD screen for Courses, Program Types and Durations.
 * All mutations touch React state only — a REST API can replace `onChange` later.
 */
export function ManageListPage({
  title,
  subtitle,
  itemNoun,
  nameLabel,
  namePlaceholder,
  icon,
  withMonths = false,
  items,
  onChange,
}: ManageListPageProps) {
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ManagedItem | null>(null);
  const [name, setName] = useState("");
  const [months, setMonths] = useState("");
  const [status, setStatus] = useState<RecordStatus>("active");
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ManagedItem | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => !q || item.name.toLowerCase().includes(q));
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setMonths("");
    setStatus("active");
    setError("");
    setFormOpen(true);
  };

  const openEdit = (item: ManagedItem) => {
    setEditing(item);
    setName(item.name);
    setMonths(item.months == null ? "" : String(item.months));
    setStatus(item.status);
    setError("");
    setFormOpen(true);
  };

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(`${nameLabel} is required`);
      return;
    }
    const duplicate = items.some(
      (i) => i.name.toLowerCase() === trimmed.toLowerCase() && i.id !== editing?.id,
    );
    if (duplicate) {
      setError(`This ${itemNoun.toLowerCase()} already exists`);
      return;
    }

    const parsedMonths = withMonths && months.trim() ? Number.parseInt(months, 10) : null;

    if (editing) {
      onChange((prev) =>
        prev.map((i) =>
          i.id === editing.id ? { ...i, name: trimmed, status, months: parsedMonths } : i,
        ),
      );
      toast.success(`${itemNoun} updated.`);
    } else {
      onChange((prev) => [
        {
          id: `${itemNoun.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`,
          name: trimmed,
          status,
          createdAt: new Date().toISOString().slice(0, 10),
          months: parsedMonths,
        },
        ...prev,
      ]);
      toast.success(`${itemNoun} added (session only).`);
    }
    setFormOpen(false);
  };

  const toggleStatus = (item: ManagedItem) => {
    const next: RecordStatus = item.status === "active" ? "inactive" : "active";
    onChange((prev) => prev.map((i) => (i.id === item.id ? { ...i, status: next } : i)));
    toast.success(`${item.name} ${next === "active" ? "activated" : "deactivated"}.`);
  };

  const columns: Column<ManagedItem>[] = [
    {
      key: "name",
      header: nameLabel,
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    ...(withMonths
      ? [
          {
            key: "months",
            header: "Months",
            render: (item: ManagedItem) => (
              <span className="tabular-nums">
                {item.months == null ? "Manual end date" : item.months}
              </span>
            ),
          } as Column<ManagedItem>,
        ]
      : []),
    { key: "status", header: "Status", render: (item) => <RecordStatusBadge status={item.status} /> },
    {
      key: "created",
      header: "Created",
      render: (item) => (
        <span className="whitespace-nowrap text-muted-foreground">
          {formatShortDate(item.createdAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (item) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            title="Edit"
            aria-label={`Edit ${item.name}`}
            onClick={() => openEdit(item)}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title={item.status === "active" ? "Deactivate" : "Activate"}
            aria-label={`${item.status === "active" ? "Deactivate" : "Activate"} ${item.name}`}
            onClick={() => toggleStatus(item)}
          >
            {item.status === "active" ? <PowerOff /> : <Power />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/12"
            title="Delete"
            aria-label={`Delete ${item.name}`}
            onClick={() => setPendingDelete(item)}
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
        title={title}
        subtitle={subtitle}
        actions={
          <Button onClick={openCreate}>
            <Plus />
            Add {itemNoun}
          </Button>
        }
      />

      <section className="surface-panel overflow-hidden">
        <div className="border-b border-border p-4 sm:p-5">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={`Search ${itemNoun.toLowerCase()}…`}
            label={`Search ${itemNoun.toLowerCase()}`}
            className="sm:max-w-sm"
          />
        </div>
        <DataTable
          caption={title}
          columns={columns}
          rows={rows}
          rowKey={(item) => item.id}
          empty={
            <EmptyState
              icon={icon}
              title={`No ${itemNoun.toLowerCase()} found`}
              message={`Add your first ${itemNoun.toLowerCase()} so it becomes available on the Create Receipt form.`}
              action={
                <Button onClick={openCreate}>
                  <Plus />
                  Add {itemNoun}
                </Button>
              }
            />
          }
        />
      </section>

      <Modal
        open={formOpen}
        title={editing ? `Edit ${itemNoun}` : `Add ${itemNoun}`}
        description="Changes stay in this session — no backend is connected yet."
        onClose={() => setFormOpen(false)}
        footer={
          <>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>{editing ? "Save Changes" : `Add ${itemNoun}`}</Button>
          </>
        }
      >
        <Input
          id="item-name"
          label={nameLabel}
          required
          placeholder={namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        />
        {withMonths && (
          <Input
            id="item-months"
            label="Months"
            type="number"
            min={1}
            placeholder="Leave blank for a custom end date"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            hint="Used to auto-calculate the end date on the receipt form."
          />
        )}
        <Select
          id="item-status"
          label="Status"
          value={status}
          placeholder="Select status"
          onChange={(e) => setStatus(e.target.value as RecordStatus)}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </Modal>

      <ConfirmDialog
        open={!!pendingDelete}
        title={`Delete ${itemNoun.toLowerCase()}?`}
        message={`${pendingDelete?.name ?? ""} will be removed from this session and no longer appear on the receipt form.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) {
            onChange((prev) => prev.filter((i) => i.id !== pendingDelete.id));
            toast.success(`${pendingDelete.name} deleted.`);
          }
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
