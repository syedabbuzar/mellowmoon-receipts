import type { PaymentMode, Receipt, ReceiptFormValues } from "@/types";
import { parseAmount } from "./currency";
import { todayISO } from "./dateUtils";

export function emptyForm(receiptNo: string): ReceiptFormValues {
  return {
    studentName: "",
    college: "",
    degree: "",
    yearSemester: "",
    email: "",
    mobile: "",
    programType: "Training + Internship",
    course: "",
    duration: "",
    startDate: todayISO(),
    endDate: "",
    batch: "",
    totalFee: "",
    amountPaid: "",
    paymentMode: "",
    transactionId: "",
    receiptNo,
    receiptDate: todayISO(),
  };
}

/** Build the preview/persist shape from form values (no API involved). */
export function formToReceipt(values: ReceiptFormValues, id = "draft"): Receipt {
  return {
    id,
    receiptNo: values.receiptNo,
    receiptDate: values.receiptDate,
    student: {
      id: `stu-${id}`,
      name: values.studentName,
      college: values.college,
      degree: values.degree,
      yearSemester: values.yearSemester,
      email: values.email,
      mobile: values.mobile,
    },
    programType: values.programType,
    course: values.course,
    duration: values.duration,
    startDate: values.startDate,
    endDate: values.endDate,
    batch: values.batch,
    totalFee: parseAmount(values.totalFee),
    amountPaid: parseAmount(values.amountPaid),
    paymentMode: (values.paymentMode || "Cash") as PaymentMode,
    transactionId: values.transactionId,
  };
}

export interface FormErrors {
  [key: string]: string;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const mobileRe = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export function validateForm(values: ReceiptFormValues): FormErrors {
  const errors: FormErrors = {};
  const required: [keyof ReceiptFormValues, string][] = [
    ["studentName", "Student full name is required"],
    ["college", "College / University name is required"],
    ["degree", "Course / Degree is required"],
    ["yearSemester", "Year / Semester is required"],
    ["email", "Email address is required"],
    ["mobile", "Mobile number is required"],
    ["programType", "Program type is required"],
    ["course", "Internship course is required"],
    ["duration", "Duration is required"],
    ["startDate", "Start date is required"],
  ];

  for (const [key, message] of required) {
    if (!String(values[key] ?? "").trim()) errors[key] = message;
  }

  if (values.email && !emailRe.test(values.email.trim())) {
    errors["email"] = "Please enter a valid email address";
  }
  if (values.mobile && !mobileRe.test(values.mobile.trim())) {
    errors["mobile"] = "Please enter a valid 10-digit mobile number";
  }

  const total = parseAmount(values.totalFee);
  const paid = parseAmount(values.amountPaid);

  if (!values.totalFee.trim()) errors["totalFee"] = "Total fee is required";
  else if (total <= 0) errors["totalFee"] = "Total fee must be greater than ₹0";

  if (!values.amountPaid.trim()) errors["amountPaid"] = "Amount paid is required";
  else if (paid < 0) errors["amountPaid"] = "Amount paid cannot be negative";
  else if (total > 0 && paid > total)
    errors["amountPaid"] = "Amount paid cannot be greater than total fee";

  if (values.endDate && values.startDate && values.endDate < values.startDate) {
    errors["endDate"] = "End date must be after the start date";
  }

  if (
    (values.paymentMode === "UPI" || values.paymentMode === "Bank Transfer") &&
    !values.transactionId.trim()
  ) {
    errors["transactionId"] = "Transaction ID / UTR is required for this payment mode";
  }

  return errors;
}
