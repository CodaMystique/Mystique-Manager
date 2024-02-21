// AddTaskButton.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function AddTaskButton({ onClick, isLoading }) {
  return (
    <button
      onClick={onClick}
      className="text-stone-700 hover:text-stone-950 flex justify-center items-center"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <BiLoaderCircle className="animate-spin mr-2" /> Adding Task...
        </>
      ) : (
        "Add Task"
      )}
    </button>
  );
}

export default AddTaskButton;
