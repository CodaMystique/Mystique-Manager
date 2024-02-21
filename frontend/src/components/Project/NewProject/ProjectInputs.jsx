import React, { useState } from "react";

function ProjectInputs({
  title,
  description,
  dueDate,
  onTitleChange,
  onDescriptionChange,
  onDueDateChange,
}) {
  return (
    <div>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm uppercase text-stone-500">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>

      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm uppercase text-stone-500">Description</label>
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600 h-14 min-h-[3rem] max-h-60"
        />
      </p>

      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm uppercase text-stone-500">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      </p>
    </div>
  );
}

export default ProjectInputs;
