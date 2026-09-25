import { usePortalData } from "@/contexts/PortalDataContext";

export function useSettings() {
  const { loading, company, settings, setCompany, setSettings } = usePortalData();
  return { loading, company, settings, setCompany, setSettings };
}
