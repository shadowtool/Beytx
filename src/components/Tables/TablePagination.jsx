"use client";

import React from "react";

function TablePagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 my-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-8 min-w-16 max-h-8 max-w-16 text-sm bg-gray-100 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`min-h-8 min-w-16 max-h-8 max-w-16 text-sm rounded transition-all duration-300 ${
            page === currentPage
              ? "bg-emerald-600 text-white"
              : "bg-gray-100 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-8 min-w-16 max-h-8 max-w-16 text-sm bg-gray-100 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default TablePagination;
