// AddProjectButton.jsx
import React from "react";
import { MdAdd } from "react-icons/md";

function AddProjectButton({ handleStartAddProject }) {
  return (
    <div>
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 flex items-center"
        onClick={handleStartAddProject}
      >
        <MdAdd className="mr-2" />
        <span>Add Project</span>
      </button>
    </div>
  );
}

export default AddProjectButton;
