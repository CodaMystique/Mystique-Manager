import React, { useState } from "react";
import NewTask from "../NewTask/NewTask.jsx";
import useProjects from "../../../hooks/useProjects.js";
import useDeleteTask from "../../../hooks/useDeleteTask.js";
import toast from "react-hot-toast";
import TaskItem from "./TaskItem.jsx";
import Pagination from "./Pagination.jsx";
import EmptyTasksMessage from "./EmptyTasksMessage.jsx";
import FullTextModal from "./FullTextModal.jsx";

export default function Tasks() {
  const { selectedProject, selectedProjectId } = useProjects();
  const { deleteTask } = useDeleteTask();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedProjectTasks = selectedProject.tasks;
  const [loadingTasks, setLoadingTasks] = useState({});
  const [showFullTextModal, setShowFullTextModal] = useState(false);
  const [fullText, setFullText] = useState("");

  const toggleFullTextModal = (text) => {
    setFullText(text);
    setShowFullTextModal(!showFullTextModal);
  };

  const tasksPerPage = 8;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = selectedProjectTasks
    ? selectedProjectTasks.slice(indexOfFirstTask, indexOfLastTask)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const taskRangeStart = Math.min(
    selectedProjectTasks.length === 0 ? 0 : indexOfFirstTask + 1,
    selectedProjectTasks.length
  );
  const taskRangeEnd = Math.min(indexOfLastTask, selectedProjectTasks.length);

  async function handleDeleteTask(id) {
    setLoadingTasks((prevLoadingTasks) => ({
      ...prevLoadingTasks,
      [id]: true,
    }));

    try {
      await deleteTask(selectedProjectId, id);
      if (currentTasks.length === 1 && currentPage !== 1) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingTasks((prevLoadingTasks) => ({
        ...prevLoadingTasks,
        [id]: false,
      }));
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && <EmptyTasksMessage />}
      {selectedProjectTasks.length > 0 && (
        <div className="p-4 mt-8 rounded-md bg-stone-100">
          <ul>
            {currentTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                loading={loadingTasks}
                toggleFullTextModal={toggleFullTextModal}
              />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={selectedProjectTasks.length}
            paginate={paginate}
            taskRangeStart={taskRangeStart}
            taskRangeEnd={taskRangeEnd}
          />
        </div>
      )}
      {showFullTextModal && (
        <FullTextModal fullText={fullText} toggleModal={toggleFullTextModal} />
      )}
    </section>
  );
}
