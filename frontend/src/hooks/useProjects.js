import { useProjectsContext } from "../context/ProjectsContext.jsx";
import toast from "react-hot-toast";
import isValidDueDate from "../utils/isValidDueDate.js";

export default function useProjects() {
  const { projectsState, setProjectsState } = useProjectsContext();
  const { selectedProjectId, projects } = projectsState;

  async function handleAddTask(projectId, taskData) {
    try {
      if (!validateTaskData(taskData)) return;

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
    }
  }

  async function handleDeleteTask(projectId, taskId) {
    try {
      const response = await fetch(`/api/tasks/delete/${projectId}/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
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
    }
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: null };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  async function handleAddProject(projectData) {
    try {
      if (!validateProjectData(projectData)) return;

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
    }
  }

  async function handleDeleteProject(id) {
    try {
      const response = await fetch(`/api/projects/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjectsState((prevState) => {
        return {
          ...prevState,
          selectedProjectId: undefined,
          projects: prevState.projects.filter((project) => project._id !== id),
        };
      });
    } catch (error) {
      console.error("Error deleting project:", error.message);
      toast.error(error.message);
    }
  }

  async function getProjects() {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjectsState((prevState) => {
        return {
          ...prevState,
          projects: data,
        };
      });
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching projects:", error.message);
    }
  }

  const selectedProject = projects.find(
    (project) => project._id === selectedProjectId
  );

  return {
    selectedProject,
    projects,
    selectedProjectId,
    handleAddTask,
    handleDeleteTask,
    handleSelectProject,
    handleStartAddProject,
    handleCancelAddProject,
    handleAddProject,
    handleDeleteProject,
    getProjects,
  };
}

function validateTaskData(taskData) {
  if (taskData.trim() === "") {
    toast.error("Task data must be a non-empty string.");
    return false;
  }
  return true;
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
