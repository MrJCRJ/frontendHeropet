import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "warning" | "ghost";
  children: React.ReactNode;
}

const baseStyle =
  "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-md",
  danger: "bg-red-600 hover:bg-red-500 text-white shadow-md",
  warning: "bg-yellow-500 hover:bg-yellow-400 text-black shadow-md",
  ghost: "bg-[#1a1d23] border border-gray-700 text-gray-300 hover:bg-[#22262e]",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
