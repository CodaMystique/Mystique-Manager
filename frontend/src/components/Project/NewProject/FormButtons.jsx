// FormButtons.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function FormButtons({ isLoading, handleCancel, handleSave }) {
  return (
    <menu className="flex items-center justify-end gap-4 my-4">
      <li>
        <button
          onClick={handleCancel}
          className="text-stone-800 hover:text-stone-950"
        >
          Cancel
        </button>
      </li>
      <li>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 flex items-center"
          onClick={handleSave}
        >
          {isLoading ? (
            <>
              <BiLoaderCircle className="animate-spin mr-2" /> Saving...
            </>
          ) : (
            "Save"
          )}
        </button>
      </li>
    </menu>
  );
}

export default FormButtons;
