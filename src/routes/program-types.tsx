import { createFileRoute } from "@tanstack/react-router";
import { Layers } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { usePortalData } from "@/store/portal-data";

export const Route = createFileRoute("/program-types")({
  head: () => ({
    meta: [
      { title: "Program Types — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Define the programme types — Training + Internship, Internship, Training or custom — used on receipts.",
      },
      { property: "og:title", content: "Program Types — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Define the programme types used on internship and training receipts.",
      },
    ],
  }),
  component: ProgramTypesPage,
});

function ProgramTypesPage() {
  const { programTypes, setProgramTypes } = usePortalData();

  return (
    <ManageListPage
      title="Program Types"
      subtitle="Programme categories available on the receipt form"
      itemNoun="Program Type"
      nameLabel="Program Type"
      namePlaceholder="e.g. Training + Internship"
      icon={Layers}
      items={programTypes}
      onChange={(updater) =>
        setProgramTypes((prev) => updater(prev as ManagedItem[]) as typeof prev)
      }
    />
  );
}
