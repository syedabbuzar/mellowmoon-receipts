import { usePortalData } from "@/contexts/PortalDataContext";

export function useProgramTypes() {
  const { loading, programTypes, setProgramTypes } = usePortalData();
  return { loading, programTypes, setProgramTypes };
}
