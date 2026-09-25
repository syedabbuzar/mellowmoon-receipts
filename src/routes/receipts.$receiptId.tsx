import { createFileRoute } from "@tanstack/react-router";

import ReceiptDetails from "@/pages/ReceiptDetails";

export const Route = createFileRoute("/receipts/$receiptId")({
  head: () => ({
    meta: [
      { title: "Receipt Details — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Full receipt record with student, programme and payment details plus a print-ready A4 document.",
      },
      { property: "og:title", content: "Receipt Details — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Full receipt record with student, programme and payment details.",
      },
    ],
  }),
  component: ReceiptDetails,
});
