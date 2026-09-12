import type { Duration } from "@/types";

/** Replace with `GET /api/durations` later. */
export const mockDurations: Duration[] = [
  { id: "dur-1", label: "2 Months", months: 2, status: "active", createdAt: "2026-01-10" },
  { id: "dur-2", label: "6 Months", months: 6, status: "active", createdAt: "2026-01-10" },
  { id: "dur-3", label: "Custom", months: null, status: "active", createdAt: "2026-01-10" },
];
