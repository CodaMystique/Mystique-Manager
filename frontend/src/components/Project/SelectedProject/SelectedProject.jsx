import React from "react";
import useProjects from "../../../hooks/useProjects.js";
import useDeleteProject from "../../../hooks/useDeleteProject.js";
import ProjectHeader from "./ProjectHeader.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import ProjectTasks from "./ProjectTasks.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";

export default function SelectedProject() {
  const { isLoading, deleteProject } = useDeleteProject();
  const { selectedProject } = useProjects();

  return (
    <div className="w-[35rem] mt-16">
      <ProjectHeader
        selectedProject={selectedProject}
        isLoading={isLoading}
        onDelete={deleteProject}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ProjectDetails description={selectedProject.description} />
          <ProjectTasks />
        </>
      )}
    </div>
  );
}
