// TaskInput.jsx
import React from "react";

function TaskInput({ value, onChange }) {
  return (
    <input
      type="text"
      className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      onChange={onChange}
      value={value}
    />
  );
}

export default TaskInput;
