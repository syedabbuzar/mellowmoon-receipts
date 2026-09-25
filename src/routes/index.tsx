import { createFileRoute } from "@tanstack/react-router";

import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Receipt, collection and pending-fee overview for MellowMoon SoftTech internship and training programmes.",
      },
      { property: "og:title", content: "Dashboard — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Receipt, collection and pending-fee overview for MellowMoon SoftTech programmes.",
      },
    ],
  }),
  component: Dashboard,
});
