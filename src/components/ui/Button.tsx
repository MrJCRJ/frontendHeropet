import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "warning" | "ghost";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const baseStyle =
  "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-500 text-white shadow-md focus:ring-blue-400",
  danger: "bg-red-600 hover:bg-red-500 text-white shadow-md focus:ring-red-400",
  warning:
    "bg-yellow-500 hover:bg-yellow-400 text-black shadow-md focus:ring-yellow-300",
  ghost:
    "bg-slate-800 border border-slate-700 text-gray-300 hover:bg-slate-700 focus:ring-slate-500",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  fullWidth = false,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      aria-busy={isLoading}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
