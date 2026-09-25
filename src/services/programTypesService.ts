// import api from "./api";
import { mockProgramTypes } from "@/mock/programTypes";
import type { ProgramType } from "@/types";

/**
 * Returns mock data until the backend exists.
 * Later: `const { data } = await api.get("/program-types"); return data;`
 */
export async function getProgramTypes(): Promise<ProgramType[]> {
  return structuredClone(mockProgramTypes);
}
