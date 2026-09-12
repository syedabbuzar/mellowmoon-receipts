import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

import { controlClass, controlErrorClass, Field } from "./Field";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  hint?: string;
  fieldClassName?: string;
}

export function Select({
  id,
  label,
  options,
  placeholder = "Select…",
  error,
  hint,
  required,
  className,
  fieldClassName,
  ...props
}: SelectProps) {
  return (
    <Field
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={fieldClassName}
    >
      <div className="relative">
        <select
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(controlClass, "appearance-none pr-9", error && controlErrorClass, className)}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </Field>
  );
}
