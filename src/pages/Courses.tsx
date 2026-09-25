import { BookOpen } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { useCourses } from "@/hooks/useCourses";


export default function Courses() {
  const { courses, setCourses } = useCourses();

  return (
    <ManageListPage
      title="Courses"
      subtitle="Courses offered across internship and training programmes"
      itemNoun="Course"
      nameLabel="Course Name"
      namePlaceholder="e.g. Python & Agentic AI"
      icon={BookOpen}
      items={courses}
      onChange={(updater) =>
        setCourses((prev) => updater(prev as ManagedItem[]) as typeof prev)
      }
    />
  );
}
