import { useProjectsContext } from "../context/ProjectsContext.jsx";

export default function useProjects() {
  const { projectsState, setProjectsState } = useProjectsContext();
  const { selectedProjectId, projects } = projectsState;

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return { ...prevState, selectedProjectId: id };
    });
  }

  const selectedProject = projects.find(
    (project) => project._id === selectedProjectId
  );

  return {
    selectedProject,
    projects,
    selectedProjectId,
    handleSelectProject,
  };
}
