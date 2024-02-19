import React, { useState } from "react";
import { BiLoaderCircle, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import NewTask from "./NewTask.jsx";
import useProjects from "../../hooks/useProjects";
import useDeleteTask from "../../hooks/useDeleteTask.js";

export default function Tasks() {
  const { selectedProject, selectedProjectId } = useProjects();
  const { deleteTask } = useDeleteTask();
  const [loadingTasks, setLoadingTasks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;

  function handleDeleteTask(id) {
    setLoadingTasks((prevLoadingTasks) => ({
      ...prevLoadingTasks,
      [id]: true,
    }));
    deleteTask(selectedProjectId, id).finally(() => {
      setLoadingTasks((prevLoadingTasks) => ({
        ...prevLoadingTasks,
        [id]: false,
      }));
    });
  }

  const selectedProjectTasks = selectedProject.tasks;

  // Logic for displaying tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = selectedProjectTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  // Logic for changing page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the range of tasks being shown
  const taskRangeStart = indexOfFirstTask + 1;
  const taskRangeEnd = Math.min(indexOfLastTask, selectedProjectTasks.length);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedProjectTasks.length > 0 && (
        <div className="p-4 mt-8 rounded-md bg-stone-100">
          <ul>
            {currentTasks.map((task) => (
              <li key={task._id} className="flex justify-between my-4">
                <span className="task-text whitespace-normal overflow-hidden break-words mr-8">
                  {task.text}
                </span>
                <button
                  className="text-stone-700 hover:text-red-500 flex justify-center items-center transition-colors duration-300 ease-in-out transform hover:scale-110"
                  onClick={() => handleDeleteTask(task._id)}
                  disabled={loadingTasks[task._id]}
                >
                  {loadingTasks[task._id] ? (
                    <>
                      <BiLoaderCircle className="animate-spin mr-2 text-blue-500" />{" "}
                      Clearing...
                    </>
                  ) : (
                    "Clear"
                  )}
                </button>
              </li>
            ))}
          </ul>
          {/* Pagination */}
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
            <span className="text-gray-600">{`Showing ${taskRangeStart}-${taskRangeEnd} of ${selectedProjectTasks.length} tasks`}</span>
            <button
              className={`${
                currentTasks.length < tasksPerPage
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentTasks.length < tasksPerPage}
            >
              <BiChevronRight className="text-gray-600 glow" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
