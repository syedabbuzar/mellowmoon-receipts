import type { CompanyProfile, ReceiptSettings } from "@/types";

export const mockCompany: CompanyProfile = {
  name: "MellowMoon SoftTech Pvt. Ltd.",
  address: "Baba Nagar, Nanded, Maharashtra, India",
  email: "mellowmoonsofttech@gmail.com",
  phone: "+91 70581 23707 / +91 77964 42339",
  website: "www.mellwomoonsofttech.com",
  cin: "U62013ME2026PTC475254",
};

export const mockReceiptSettings: ReceiptSettings = {
  prefix: "MMST",
  numberFormat: "PREFIX-YYYY-0000",
  dateFormat: "DD MMMM YYYY",
  currency: "INR (₹)",
};
