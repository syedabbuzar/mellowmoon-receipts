import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { usePortalData } from "@/store/portal-data";
import type { Duration } from "@/types";

export const Route = createFileRoute("/durations")({
  head: () => ({
    meta: [
      { title: "Duration Management — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Manage programme durations and the month counts used to auto-calculate internship end dates.",
      },
      { property: "og:title", content: "Duration Management — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Manage programme durations used to auto-calculate internship end dates.",
      },
    ],
  }),
  component: DurationsPage,
});

function DurationsPage() {
  const { durations, setDurations } = usePortalData();

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
