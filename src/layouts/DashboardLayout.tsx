import { Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Button } from "@/components/common/Button";
import { Sidebar } from "@/components/layout/Sidebar";
import { formatLongDate, todayISO } from "@/utils/dateUtils";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu />
          </Button>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
              MellowMoon SoftTech Pvt. Ltd.
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Internship &amp; Training Receipt Portal
            </p>
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-3">
            <p className="hidden text-right text-xs text-muted-foreground sm:block">
              {formatLongDate(todayISO())}
            </p>
            <span className="grid size-9 place-items-center rounded-full border border-gold/35 bg-gold/10 text-xs font-bold text-gold">
              AD
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
