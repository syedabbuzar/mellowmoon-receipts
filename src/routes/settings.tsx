import { createFileRoute } from "@tanstack/react-router";
import { Building2, ReceiptText, RotateCcw, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import logo from "@/assets/mellowmoon-logo.png.asset.json";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { PageHeader, SectionCard } from "@/components/common/PageHeader";
import { Select } from "@/components/common/Select";
import { usePortalData } from "@/store/portal-data";
import { mockCompany, mockReceiptSettings } from "@/mock/company";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — MellowMoon Receipt Manager" },
      {
        name: "description",
        content:
          "Company details, logo, CIN and receipt numbering preferences for MellowMoon SoftTech receipts.",
      },
      { property: "og:title", content: "Settings — MellowMoon Receipt Manager" },
      {
        property: "og:description",
        content: "Company details and receipt numbering preferences for MellowMoon SoftTech.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { company, settings, setCompany, setSettings } = usePortalData();
  const [draftCompany, setDraftCompany] = useState(company);
  const [draftSettings, setDraftSettings] = useState(settings);

  const save = () => {
    setCompany(draftCompany);
    setSettings(draftSettings);
    toast.success("Settings applied to this session — no backend persistence yet.");
  };

  const reset = () => {
    setDraftCompany(mockCompany);
    setDraftSettings(mockReceiptSettings);
    setCompany(mockCompany);
    setSettings(mockReceiptSettings);
    toast.info("Settings restored to defaults.");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Company identity and receipt preferences used across the portal"
        actions={
          <>
            <Button variant="outline" onClick={reset}>
              <RotateCcw />
              Restore Defaults
            </Button>
            <Button onClick={save}>
              <Save />
              Save Changes
            </Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
        <div className="space-y-6">
          <SectionCard
            title="Company Information"
            description="Appears in the receipt header"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="companyName"
                label="Company Name"
                value={draftCompany.name}
                onChange={(e) => setDraftCompany({ ...draftCompany, name: e.target.value })}
                fieldClassName="sm:col-span-2"
              />
              <Input
                id="companyAddress"
                label="Address"
                value={draftCompany.address}
                onChange={(e) => setDraftCompany({ ...draftCompany, address: e.target.value })}
                fieldClassName="sm:col-span-2"
              />
              <Input
                id="companyEmail"
                label="Email"
                type="email"
                value={draftCompany.email}
                onChange={(e) => setDraftCompany({ ...draftCompany, email: e.target.value })}
              />
              <Input
                id="companyPhone"
                label="Phone"
                value={draftCompany.phone}
                onChange={(e) => setDraftCompany({ ...draftCompany, phone: e.target.value })}
              />
              <Input
                id="companyWebsite"
                label="Website"
                value={draftCompany.website}
                onChange={(e) => setDraftCompany({ ...draftCompany, website: e.target.value })}
              />
              <Input
                id="companyCin"
                label="CIN"
                value={draftCompany.cin}
                onChange={(e) => setDraftCompany({ ...draftCompany, cin: e.target.value })}
              />
            </div>
          </SectionCard>

          <SectionCard title="Receipt Settings" description="Numbering, dates and currency">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="receiptPrefix"
                label="Receipt Prefix"
                value={draftSettings.prefix}
                onChange={(e) =>
                  setDraftSettings({ ...draftSettings, prefix: e.target.value.toUpperCase() })
                }
                hint="Example: MMST"
              />
              <Select
                id="numberFormat"
                label="Receipt Number Format"
                value={draftSettings.numberFormat}
                onChange={(e) =>
                  setDraftSettings({ ...draftSettings, numberFormat: e.target.value })
                }
                options={[
                  { value: "PREFIX-YYYY-0000", label: "PREFIX-YYYY-0000" },
                  { value: "PREFIX/YYYY/0000", label: "PREFIX/YYYY/0000" },
                  { value: "PREFIX-0000", label: "PREFIX-0000" },
                ]}
              />
              <Select
                id="dateFormat"
                label="Default Date Format"
                value={draftSettings.dateFormat}
                onChange={(e) => setDraftSettings({ ...draftSettings, dateFormat: e.target.value })}
                options={[
                  { value: "DD MMMM YYYY", label: "DD MMMM YYYY" },
                  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                ]}
              />
              <Select
                id="currency"
                label="Currency"
                value={draftSettings.currency}
                onChange={(e) => setDraftSettings({ ...draftSettings, currency: e.target.value })}
                options={[
                  { value: "INR (₹)", label: "INR (₹)" },
                  { value: "USD ($)", label: "USD ($)" },
                ]}
              />
            </div>
            <div className="mt-5 rounded-lg border border-gold/25 bg-gold/6 px-4 py-3">
              <p className="text-xs text-muted-foreground">Next receipt number preview</p>
              <p className="mt-1 font-display text-xl font-semibold tracking-wide text-gold">
                {draftSettings.prefix || "MMST"}-{new Date().getFullYear()}-0007
              </p>
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Logo" description="Used on the receipt header">
            <div className="rounded-lg border border-border bg-white p-5">
              <img
                src={logo.url}
                alt="MellowMoon SoftTech logo"
                className="mx-auto h-20 w-auto object-contain"
              />
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => toast.info("Logo upload will be wired to the backend later.")}
            >
              Replace Logo
            </Button>
          </SectionCard>

          <SectionCard title="Applied Identity">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Building2 className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span className="min-w-0 break-words">{company.name}</span>
              </li>
              <li className="flex gap-3">
                <ReceiptText className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span className="min-w-0 break-words">
                  {settings.prefix} · {settings.currency}
                </span>
              </li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Values reset on refresh — persistence arrives with the backend.
            </p>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
