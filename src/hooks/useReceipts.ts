import { usePortalData } from "@/contexts/PortalDataContext";

export function useReceipts() {
  const { loading, receipts, addReceipt, deleteReceipt } = usePortalData();
  return { loading, receipts, addReceipt, deleteReceipt };
}
