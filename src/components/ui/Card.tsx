import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-[#1a1d23] hover:bg-[#20242b] transition-all duration-200 rounded-xl p-5 shadow-lg border border-gray-800 cursor-pointer group ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
