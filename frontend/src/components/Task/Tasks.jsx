import React, { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import NewTask from "./NewTask.jsx";
import useProjects from "../../hooks/useProjects";

export default function Tasks() {
  const { selectedProject, handleDeleteTask, selectedProjectId } =
    useProjects();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const selectedProjectTasks = selectedProject.tasks;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = selectedProjectTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const totalPages = Math.ceil(selectedProjectTasks.length / tasksPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {currentTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {currentTasks.length > 0 && (
        <>
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {currentTasks.map((task) => (
              <li key={task._id} className="flex justify-between my-4">
                <span>{task.text}</span>
                <button
                  className="text-stone-700 hover:text-red-500"
                  onClick={() => handleDeleteTask(selectedProjectId, task._id)}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-stone-500 text-white hover:bg-stone-600"
              }`}
            >
              <RiArrowLeftSLine className="inline-block mr-1" />
              Prev
            </button>
            <div>
              <ul className="flex">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className="mx-1">
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === i + 1
                          ? "bg-stone-500 text-white"
                          : "bg-gray-300 text-gray-600 hover:bg-stone-500 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-stone-500 text-white hover:bg-stone-600"
              }`}
            >
              Next
              <RiArrowRightSLine className="inline-block ml-1" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
