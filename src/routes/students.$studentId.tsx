import { createFileRoute } from "@tanstack/react-router";

import StudentDetails from "@/pages/StudentDetails";

export const Route = createFileRoute("/students/$studentId")({
  head: () => ({
    meta: [
      { title: "Student Profile — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Student profile with contact details, programme fee summary and complete receipt history.",
      },
      { property: "og:title", content: "Student Profile — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Student profile with fee summary and complete receipt history.",
      },
    ],
  }),
  component: StudentDetails,
});
