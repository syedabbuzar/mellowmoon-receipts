import { createFileRoute } from "@tanstack/react-router";

import Students from "@/pages/Students";

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
  component: Students,
});
