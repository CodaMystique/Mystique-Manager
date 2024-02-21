import { useState } from "react";
import toast from "react-hot-toast";
import { useProjectsContext } from "../context/ProjectsContext.jsx";

function useDeleteProject() {
  const [isLoading, setIsLoading] = useState(false);
  const { setProjectsState } = useProjectsContext();

  async function deleteProject(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/projects/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setProjectsState((prevState) => ({
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting project:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, deleteProject };
}

export default useDeleteProject;
