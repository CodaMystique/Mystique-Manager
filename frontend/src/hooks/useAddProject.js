import { useState } from "react";
import toast from "react-hot-toast";
import { useProjectsContext } from "../context/ProjectsContext.jsx";
import isValidDueDate from "../utils/isValidDueDate.js";

export default function useAddProject() {
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

      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: [...prevState.projects, newProject],
        };
      });
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

function validateProjectData({ title, description, dueDate }) {
  if (!title.trim() || !description.trim() || !dueDate.trim()) {
    toast.error("Invalid Data.");
    return false;
  }

  if (!isValidDueDate(dueDate)) {
    toast.error("Due date must be in future or current time");
    return false;
  }

  return true;
}
