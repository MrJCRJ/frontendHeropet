import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full sm:w-96 px-4 py-2 rounded-lg bg-[#1a1d23] border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm ${className}`}
      {...props}
    />
  );
};
