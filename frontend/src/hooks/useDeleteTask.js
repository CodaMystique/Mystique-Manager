import { useState } from "react";
import { useProjectsContext } from "../context/ProjectsContext";
import toast from "react-hot-toast";

export default function useDeleteTask() {
  const [isLoading, setIsLoading] = useState(false);
  const { setProjectsState } = useProjectsContext();

  async function deleteTask(projectId, taskId) {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/tasks/delete/${projectId}/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setProjectsState((prevState) => {
        const updatedProjects = prevState.projects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              tasks: project.tasks.filter((task) => task._id !== taskId),
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
      console.error("Error deleting task:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, deleteTask };
}
