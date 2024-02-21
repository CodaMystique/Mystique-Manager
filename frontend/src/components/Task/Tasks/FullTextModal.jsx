// FullTextModal.jsx
import React from "react";
import { BiX } from "react-icons/bi";

function FullTextModal({ fullText, toggleModal }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleModal}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-stone-700">Full Task Text</h2>
          <button
            className="text-stone-700 hover:text-red-500"
            onClick={toggleModal}
          >
            <BiX className="text-xl" />
          </button>
        </div>
        <p className="text-stone-800 break-words">{fullText}</p>
      </div>
    </div>
  );
}

export default FullTextModal;
