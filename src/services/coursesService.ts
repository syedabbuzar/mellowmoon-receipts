// import api from "./api";
import { mockCourses } from "@/mock/courses";
import type { Course } from "@/types";

/**
 * Returns mock data until the backend exists.
 * Later: `const { data } = await api.get("/courses"); return data;`
 */
export async function getCourses(): Promise<Course[]> {
  return structuredClone(mockCourses);
}
