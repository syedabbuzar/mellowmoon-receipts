import { usePortalData } from "@/contexts/PortalDataContext";

export function useDurations() {
  const { loading, durations, setDurations } = usePortalData();
  return { loading, durations, setDurations };
}
