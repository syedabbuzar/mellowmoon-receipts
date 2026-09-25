import { usePortalData } from "@/contexts/PortalDataContext";

export function useStudents() {
  const { loading, students } = usePortalData();
  return { loading, students };
}
