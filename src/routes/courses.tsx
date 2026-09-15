import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { ManageListPage, type ManagedItem } from "@/components/common/ManageListPage";
import { usePortalData } from "@/store/portal-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Manage the internship and training courses offered by MellowMoon SoftTech and available on receipts.",
      },
      { property: "og:title", content: "Courses — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Manage the internship and training courses available on receipts.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { courses, setCourses } = usePortalData();

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
