import type { InputHTMLAttributes } from "react";

import { controlClass, controlErrorClass, Field } from "./Field";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  fieldClassName?: string | undefined;
}

export function Input({
  id,
  label,
  error,
  hint,
  required,
  className,
  fieldClassName,
  ...props
}: InputProps) {
  return (
    <Field
      id={id}
      label={label}
      required={required}
      error={error}
      hint={hint}
      className={fieldClassName}
    >
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlClass, error && controlErrorClass, className)}
        {...props}
      />
    </Field>
  );
}
