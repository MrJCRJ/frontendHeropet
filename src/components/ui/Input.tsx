import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  fullWidth = false,
  className = "",
  id,
  ...props
}) => {
  const inputId =
    id || `input-${props.name || Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      className={`flex flex-col gap-1 ${
        fullWidth ? "w-full" : "w-full sm:w-96"
      }`}
    >
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!errorMessage}
        className={`px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-gray-200 placeholder-gray-500 
        focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm ${className}`}
        {...props}
      />
      {errorMessage && (
        <span className="text-xs text-red-400" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
