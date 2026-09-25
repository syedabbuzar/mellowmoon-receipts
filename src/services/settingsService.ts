// import api from "./api";
import { mockCompany, mockReceiptSettings } from "@/mock/company";
import type { CompanyProfile, ReceiptSettings } from "@/types";

/** Returns mock data until the backend exists. Later: `api.get("/settings")`. */
export async function getSettings(): Promise<{ company: CompanyProfile; settings: ReceiptSettings }> {
  return structuredClone({ company: mockCompany, settings: mockReceiptSettings });
}
