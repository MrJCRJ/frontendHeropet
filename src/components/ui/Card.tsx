import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
  title?: string;
  description?: string;
}

export const Card: React.FC<CardProps> = ({
  clickable = false,
  title,
  description,
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`bg-slate-800 hover:bg-slate-700 transition-all duration-200 rounded-xl p-5 shadow-lg border border-slate-700
      ${
        clickable
          ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          : ""
      }
      ${className}`}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? "button" : "region"}
      {...props}
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && (
        <p className="text-sm text-gray-400 mb-4">{description}</p>
      )}
      {children}
    </div>
  );
};
