// import api from "./api";
import { mockStudents } from "@/mock/students";
import type { Student } from "@/types";

/**
 * Returns mock data until the backend exists.
 * Later: `const { data } = await api.get("/students"); return data;`
 */
export async function getStudents(): Promise<Student[]> {
  return structuredClone(mockStudents);
}
