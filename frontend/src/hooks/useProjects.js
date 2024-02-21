import { useProjectsContext } from "../context/ProjectsContext.jsx";

function useProjects() {
  const { projectsState, setProjectsState } = useProjectsContext();
  const { selectedProjectId, projects } = projectsState;

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

  const selectedProject = projects.find(
    (project) => project._id === selectedProjectId
  );

  return {
    selectedProject,
    projects,
    selectedProjectId,
    handleSelectProject,
    handleStartAddProject,
    handleCancelAddProject,
  };
}

export default useProjects;
