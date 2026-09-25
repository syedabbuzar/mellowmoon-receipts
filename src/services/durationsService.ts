// import api from "./api";
import { mockDurations } from "@/mock/durations";
import type { Duration } from "@/types";

/**
 * Returns mock data until the backend exists.
 * Later: `const { data } = await api.get("/durations"); return data;`
 */
export async function getDurations(): Promise<Duration[]> {
  return structuredClone(mockDurations);
}
