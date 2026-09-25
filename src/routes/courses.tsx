import { createFileRoute } from "@tanstack/react-router";

import Courses from "@/pages/Courses";

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
  component: Courses,
});
