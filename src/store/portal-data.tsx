import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { mockCompany, mockReceiptSettings } from "@/mock/company";
import { mockCourses } from "@/mock/courses";
import { mockDurations } from "@/mock/durations";
import { mockProgramTypes } from "@/mock/programTypes";
import { mockReceipts } from "@/mock/receipts";
import { mockStudents } from "@/mock/students";
import type {
  CompanyProfile,
  Course,
  Duration,
  ProgramType,
  Receipt,
  ReceiptSettings,
  Student,
} from "@/types";

/**
 * In-memory data layer. Everything lives in React state only — no storage, no API.
 * When a backend exists, swap these mock seeds and mutators for API calls; the UI
 * consuming `usePortalData()` stays unchanged.
 */

interface PortalData {
  company: CompanyProfile;
  settings: ReceiptSettings;
  courses: Course[];
  programTypes: ProgramType[];
  durations: Duration[];
  students: Student[];
  receipts: Receipt[];
  setCompany: (next: CompanyProfile) => void;
  setSettings: (next: ReceiptSettings) => void;
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  setProgramTypes: React.Dispatch<React.SetStateAction<ProgramType[]>>;
  setDurations: React.Dispatch<React.SetStateAction<Duration[]>>;
  addReceipt: (receipt: Receipt) => void;
  deleteReceipt: (id: string) => void;
}

const PortalDataContext = createContext<PortalData | null>(null);

export function PortalDataProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyProfile>(mockCompany);
  const [settings, setSettings] = useState<ReceiptSettings>(mockReceiptSettings);
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [programTypes, setProgramTypes] = useState<ProgramType[]>(mockProgramTypes);
  const [durations, setDurations] = useState<Duration[]>(mockDurations);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [receipts, setReceipts] = useState<Receipt[]>(mockReceipts);

  const addReceipt = useCallback((receipt: Receipt) => {
    setReceipts((prev) => [receipt, ...prev]);
    setStudents((prev) =>
      prev.some((s) => s.email === receipt.student.email) ? prev : [receipt.student, ...prev],
    );
  }, []);

  const deleteReceipt = useCallback((id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const value = useMemo<PortalData>(
    () => ({
      company,
      settings,
      courses,
      programTypes,
      durations,
      students,
      receipts,
      setCompany,
      setSettings,
      setCourses,
      setProgramTypes,
      setDurations,
      addReceipt,
      deleteReceipt,
    }),
    [company, settings, courses, programTypes, durations, students, receipts, addReceipt, deleteReceipt],
  );

  return <PortalDataContext.Provider value={value}>{children}</PortalDataContext.Provider>;
}

export function usePortalData(): PortalData {
  const ctx = useContext(PortalDataContext);
  if (!ctx) throw new Error("usePortalData must be used inside <PortalDataProvider>");
  return ctx;
}
