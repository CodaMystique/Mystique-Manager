// TaskItem.jsx
import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function TaskItem({ task, handleDeleteTask, loading, toggleFullTextModal }) {
  return (
    <li key={task._id} className="flex justify-between my-4">
      <span className="task-text whitespace-normal overflow-hidden break-words mr-8">
        <span className="overflow-hidden whitespace-nowrap text-sm max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]">
          {task.text.length > 50 ? (
            <>
              {`${task.text.substring(0, 50)}... `}
              <span
                className="cursor-pointer text-stone-600 hover:text-stone-900 transition-colors duration-300"
                onClick={() => toggleFullTextModal(task.text)}
              >
                More
              </span>
            </>
          ) : (
            task.text
          )}
        </span>
      </span>

      <button
        className="text-stone-700 hover:text-red-500 flex justify-center items-center transition-colors duration-300 ease-in-out transform hover:scale-110"
        onClick={() => handleDeleteTask(task._id)}
        disabled={loading[task._id]}
      >
        {loading[task._id] ? (
          <>
            <BiLoaderCircle className="animate-spin mr-2" />
            Clearing...
          </>
        ) : (
          "Clear"
        )}
      </button>
    </li>
  );
}

export default TaskItem;
