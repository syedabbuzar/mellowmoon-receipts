import { Search } from "lucide-react";

import { controlClass } from "./Field";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  label = "Search",
  className,
}: SearchBarProps) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <label htmlFor="portal-search" className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="portal-search"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(controlClass, "pl-9")}
      />
    </div>
  );
}
