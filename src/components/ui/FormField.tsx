// src/components/ui/FormField.tsx
import React from "react";
import { Input } from "./Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  errorMessage,
  helperText,
  fullWidth = false,
  className = "",
  id,
  ...props
}) => {
  const fieldId =
    id || `field-${props.name || Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      className={`flex flex-col gap-1 ${
        fullWidth ? "w-full" : "w-full sm:w-96"
      }`}
    >
      {/* Label */}
      <label htmlFor={fieldId} className="text-sm font-medium text-gray-300">
        {label}
      </label>

      {/* Input */}
      <Input
        id={fieldId}
        aria-invalid={!!errorMessage}
        className={className}
        {...props}
      />

      {/* Helper text */}
      {helperText && !errorMessage && (
        <span className="text-xs text-gray-400">{helperText}</span>
      )}

      {/* Error message */}
      {errorMessage && (
        <span className="text-xs text-red-400" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
