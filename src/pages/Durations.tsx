import { CalendarClock } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { useDurations } from "@/hooks/useDurations";
import type { Duration } from "@/types";


export default function Durations() {
  const { durations, setDurations } = useDurations();

  const items: ManagedItem[] = durations.map((d) => ({
    id: d.id,
    name: d.label,
    status: d.status,
    createdAt: d.createdAt,
    months: d.months,
  }));

  return (
    <ManageListPage
      title="Duration Management"
      subtitle="Durations drive the automatic end-date calculation on receipts"
      itemNoun="Duration"
      nameLabel="Duration Label"
      namePlaceholder="e.g. 3 Months"
      icon={CalendarClock}
      withMonths
      items={items}
      onChange={(updater) =>
        setDurations((prev) => {
          const mapped: ManagedItem[] = prev.map((d) => ({
            id: d.id,
            name: d.label,
            status: d.status,
            createdAt: d.createdAt,
            months: d.months,
          }));
          return updater(mapped).map<Duration>((item) => ({
            id: item.id,
            label: item.name,
            months: item.months ?? null,
            status: item.status,
            createdAt: item.createdAt,
          }));
        })
      }
    />
  );
}
