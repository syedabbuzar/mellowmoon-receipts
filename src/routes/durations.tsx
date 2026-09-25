import { createFileRoute } from "@tanstack/react-router";

import Durations from "@/pages/Durations";

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
  component: Durations,
});
