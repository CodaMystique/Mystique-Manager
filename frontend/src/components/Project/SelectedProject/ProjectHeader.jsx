// ProjectHeader.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function ProjectHeader({ selectedProject, isLoading, onDelete }) {
  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <header className="pb-4 mb-4 border-b-2 border-stone-300">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-stone-600 mb-2">
          {selectedProject.title}
        </h1>
        <button
          className="text-stone-600 hover:text-stone-950 flex items-center justify-center"
          onClick={() => onDelete(selectedProject._id)}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <BiLoaderCircle className="animate-spin mr-2" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
      <p className="mb-4 text-stone-400">{formattedDate}</p>
    </header>
  );
}

export default ProjectHeader;
