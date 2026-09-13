import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/common/Button";

/** Frontend-only print / PDF: the browser print dialog renders just the A4 sheet. */
export function printReceipt() {
  if (typeof window === "undefined") return;
  window.print();
}

export function ReceiptActions({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Button
        variant="outline"
        size={compact ? "sm" : "md"}
        onClick={() => {
          toast.info("Choose “Save as PDF” as the destination to download the receipt.");
          printReceipt();
        }}
      >
        <Download />
        Download PDF
      </Button>
      <Button variant="primary" size={compact ? "sm" : "md"} onClick={printReceipt}>
        <Printer />
        Print Receipt
      </Button>
    </>
  );
}
