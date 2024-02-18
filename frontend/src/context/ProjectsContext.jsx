import React, { createContext, useContext } from "react";
import { useState } from "react";

const ProjectsContext = createContext();

export function useProjectsContext() {
  return useContext(ProjectsContext);
}

export function ProjectsContextProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  return (
    <ProjectsContext.Provider value={{ projectsState, setProjectsState }}>
      {children}
    </ProjectsContext.Provider>
  );
}
