import { createFileRoute } from "@tanstack/react-router";

import Receipts from "@/pages/Receipts";

export const Route = createFileRoute("/receipts/")({
  head: () => ({
    meta: [
      { title: "Receipts — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Search, filter and manage every internship and training payment receipt issued by MellowMoon SoftTech.",
      },
      { property: "og:title", content: "Receipts — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Search, filter and manage every internship and training payment receipt.",
      },
    ],
  }),
  component: Receipts,
});
