import React, { useMemo } from "react";
import { Button } from "./Button";

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

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center mt-8 gap-2"
      aria-label="Paginação de resultados"
      role="navigation"
    >
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "primary" : "ghost"}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      ))}
    </nav>
  );
};
