// import api from "./api";
import { mockReceipts } from "@/mock/receipts";
import type { Receipt } from "@/types";

/**
 * Returns mock data until the backend exists.
 * Later: `const { data } = await api.get("/receipts"); return data;`
 */
export async function getReceipts(): Promise<Receipt[]> {
  return structuredClone(mockReceipts);
}
