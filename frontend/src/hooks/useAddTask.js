import { useState } from "react";
import toast from "react-hot-toast";
import { useProjectsContext } from "../context/ProjectsContext";

export default function useAddTask() {
  const [isLoading, setIsLoading] = useState(false);
  const { setProjectsState } = useProjectsContext();

  async function addTask(projectId, taskData) {
    try {
      if (!validateTaskData(taskData)) return;
      setIsLoading(true);

      const response = await fetch(`/api/tasks/create/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: taskData }),
      });

      const newTask = await response.json();

      if (newTask.error) {
        throw new Error(newTask.error);
      }

      setProjectsState((prevState) => {
        const updatedProjects = prevState.projects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              tasks: [...project.tasks, newTask],
            };
          }
          return project;
        });

        return {
          ...prevState,
          projects: updatedProjects,
        };
      });
    } catch (error) {
      toast.error(error.message);
      console.error("Error adding task:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, addTask };
}

function validateTaskData(taskData) {
  if (taskData.trim() === "") {
    toast.error("Task data must be a non-empty string.");
    return false;
  }
  return true;
}
