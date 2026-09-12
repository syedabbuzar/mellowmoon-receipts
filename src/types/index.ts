/**
 * Shared domain types.
 * These mirror the shapes a future REST API is expected to return, so mock data
 * can be swapped for API responses without touching UI components.
 */

export type PaymentStatus = "paid" | "pending";

export type PaymentMode = "UPI" | "Cash" | "Bank Transfer" | "Other";

export type RecordStatus = "active" | "inactive";

export interface Course {
  id: string;
  name: string;
  status: RecordStatus;
  createdAt: string; // ISO date
}

export interface ProgramType {
  id: string;
  name: string;
  status: RecordStatus;
  createdAt: string;
}

export interface Duration {
  id: string;
  label: string;
  months: number | null; // null => custom / manual end date
  status: RecordStatus;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  college: string;
  degree: string;
  yearSemester: string;
  email: string;
  mobile: string;
}

export interface Receipt {
  id: string;
  receiptNo: string;
  receiptDate: string; // ISO date
  student: Student;
  programType: string;
  course: string;
  duration: string;
  startDate: string;
  endDate: string;
  batch: string;
  totalFee: number;
  amountPaid: number;
  paymentMode: PaymentMode;
  transactionId: string;
}

export interface CompanyProfile {
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  cin: string;
}

export interface ReceiptSettings {
  prefix: string;
  numberFormat: string;
  dateFormat: string;
  currency: string;
}

/** Draft shape used by the Create Receipt form. */
export interface ReceiptFormValues {
  studentName: string;
  college: string;
  degree: string;
  yearSemester: string;
  email: string;
  mobile: string;
  programType: string;
  course: string;
  duration: string;
  startDate: string;
  endDate: string;
  batch: string;
  totalFee: string;
  amountPaid: string;
  paymentMode: PaymentMode | "";
  transactionId: string;
  receiptNo: string;
  receiptDate: string;
}
