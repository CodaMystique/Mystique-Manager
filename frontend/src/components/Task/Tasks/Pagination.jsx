import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

function Pagination({
  currentPage,
  totalPages,
  paginate,
  taskRangeStart,
  taskRangeEnd,
}) {
  return (
    <div className="flex justify-between mt-4">
      <button
        className={`${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <BiChevronLeft className="text-gray-600 glow" />
      </button>
      <span className="text-gray-600">{`Showing ${taskRangeStart}-${taskRangeEnd} of ${totalPages} tasks`}</span>
      <button
        className={`${
          taskRangeEnd >= totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => paginate(currentPage + 1)}
        disabled={taskRangeEnd >= totalPages}
      >
        <BiChevronRight className="text-gray-600 glow" />
      </button>
    </div>
  );
}

export default Pagination;
