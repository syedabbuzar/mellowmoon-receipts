import { createFileRoute } from "@tanstack/react-router";

import CreateReceipt from "@/pages/CreateReceipt";

export const Route = createFileRoute("/create-receipt")({
  head: () => ({
    meta: [
      { title: "Create Receipt — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Issue a training and internship payment receipt with a live A4 preview, fee calculation and payment status.",
      },
      { property: "og:title", content: "Create Receipt — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Issue an internship payment receipt with a live A4 preview and fee calculation.",
      },
    ],
  }),
  component: CreateReceipt,
});
