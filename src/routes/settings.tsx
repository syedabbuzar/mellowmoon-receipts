import { createFileRoute } from "@tanstack/react-router";

import Settings from "@/pages/Settings";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Company details, logo, CIN and receipt numbering preferences for MellowMoon SoftTech receipts.",
      },
      { property: "og:title", content: "Settings — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Company details and receipt numbering preferences for MellowMoon SoftTech.",
      },
    ],
  }),
  component: Settings,
});
