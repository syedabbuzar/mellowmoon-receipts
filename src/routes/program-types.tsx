import { createFileRoute } from "@tanstack/react-router";

import ProgramTypes from "@/pages/ProgramTypes";

export const Route = createFileRoute("/program-types")({
  head: () => ({
    meta: [
      { title: "Program Types — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Define the programme types — Training + Internship, Internship, Training or custom — used on receipts.",
      },
      { property: "og:title", content: "Program Types — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Define the programme types used on internship and training receipts.",
      },
    ],
  }),
  component: ProgramTypes,
});
