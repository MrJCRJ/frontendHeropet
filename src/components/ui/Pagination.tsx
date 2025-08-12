import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            currentPage === i + 1
              ? "bg-blue-600 text-white"
              : "bg-[#1a1d23] border border-gray-700 text-gray-300 hover:bg-[#22262e]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
