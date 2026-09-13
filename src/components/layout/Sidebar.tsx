import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarClock,
  FilePlus2,
  Files,
  LayoutDashboard,
  Layers,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
} from "lucide-react";

import logo from "@/assets/mellowmoon-logo.png.asset.json";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/create-receipt", label: "Create Receipt", icon: FilePlus2 },
  { to: "/receipts", label: "Receipts", icon: Files },
  { to: "/students", label: "Students", icon: Users },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/program-types", label: "Program Types", icon: Layers },
  { to: "/durations", label: "Durations", icon: CalendarClock },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-sidebar transition-[width,transform] duration-300 ease-out lg:static lg:translate-x-0",
          collapsed ? "lg:w-[78px]" : "lg:w-64",
          "w-[17rem]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Portal navigation"
      >
        <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-border px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={onCloseMobile}>
            <img
              src={logo.url}
              alt="MellowMoon SoftTech"
              className="size-9 shrink-0 object-contain object-left"
              style={{ objectPosition: "12% 50%", clipPath: "inset(0 62% 0 0)" }}
            />
            {!collapsed && (
              <span className="min-w-0">
                <span className="block font-display text-lg leading-none font-semibold text-foreground">
                  MellowMoon
                </span>
                <span className="block text-[10px] tracking-[0.18em] text-gold uppercase">
                  Receipt Manager
                </span>
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onCloseMobile}
                  activeOptions={{ exact: to === "/" }}
                  activeProps={{
                    className:
                      "bg-gold/12 text-foreground border-gold/30 [&_svg]:text-gold shadow-[inset_2px_0_0_0_var(--gold)]",
                  }}
                  inactiveProps={{
                    className: "text-muted-foreground border-transparent hover:bg-elevated hover:text-foreground",
                  }}
                  title={collapsed ? label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                    collapsed && "lg:justify-center lg:px-0",
                  )}
                >
                  <Icon className="size-[18px] shrink-0" />
                  <span className={cn("truncate", collapsed && "lg:hidden")}>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-border p-3">
          <Button
            variant="ghost"
            onClick={onToggleCollapsed}
            className={cn("hidden w-full justify-start lg:flex", collapsed && "lg:justify-center")}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
            <span className={cn(collapsed && "lg:hidden")}>Collapse</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
