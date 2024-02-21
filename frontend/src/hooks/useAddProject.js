import { useState } from "react";
import toast from "react-hot-toast";
import { useProjectsContext } from "../context/ProjectsContext.jsx";
import { validateProjectData } from "../utils/validator.js";

function useAddProject() {
  const { setProjectsState } = useProjectsContext();
  const [isLoading, setIsLoading] = useState(false);

  async function addProject(projectData) {
    try {
      if (!validateProjectData(projectData)) return;
      setIsLoading(true);

      const response = await fetch("/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const newProject = await response.json();

      if (newProject.error) {
        throw new Error(newProject.error);
      }

      setProjectsState((prevState) => ({
        ...prevState,
        selectedProjectId: newProject._id,
        projects: [...prevState.projects, newProject],
      }));
    } catch (error) {
      console.error("Error adding project:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    addProject,
    isLoading,
  };
}

export default useAddProject;
