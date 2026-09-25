import { Layers } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { useProgramTypes } from "@/hooks/useProgramTypes";


export default function ProgramTypes() {
  const { programTypes, setProgramTypes } = useProgramTypes();

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
