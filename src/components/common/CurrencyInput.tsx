import { controlClass, controlErrorClass, Field } from "./Field";
import { cn } from "@/lib/utils";

interface CurrencyInputProps {
  id: string;
  label: string;
  value: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  placeholder?: string;
}

export function CurrencyInput({
  id,
  label,
  value,
  onValueChange,
  required,
  error,
  hint,
  readOnly,
  placeholder = "0",
}: CurrencyInputProps) {
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-semibold text-gold"
        >
          ₹
        </span>
        <input
          id={id}
          inputMode="decimal"
          value={value}
          readOnly={readOnly}
          aria-readonly={readOnly}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          placeholder={placeholder}
          onChange={(e) => onValueChange?.(e.target.value.replace(/[^0-9.]/g, ""))}
          className={cn(
            controlClass,
            "pl-8 font-semibold tabular-nums",
            readOnly && "cursor-default border-dashed bg-muted/60 text-muted-foreground",
            error && controlErrorClass,
          )}
        />
      </div>
    </Field>
  );
}
