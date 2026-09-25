import { usePortalData } from "@/contexts/PortalDataContext";

export function useCourses() {
  const { loading, courses, setCourses } = usePortalData();
  return { loading, courses, setCourses };
}
