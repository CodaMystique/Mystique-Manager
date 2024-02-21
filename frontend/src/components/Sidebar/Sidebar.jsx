import React, { useEffect } from "react";
import useLogout from "../../hooks/useLogout.js";
import useProjects from "../../hooks/useProjects.js";
import useGetProjects from "../../hooks/useGetProjects.js";
import ProjectList from "./ProjectList.jsx";
import LogoutButton from "./LogoutButton.jsx";
import AddProjectButton from "./AddProjectButton.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import SidebarHeader from "./SidebarHeader.jsx";

export default function Sidebar() {
  const { isLoading: isLoggingOut, logoutUser } = useLogout();
  const {
    handleStartAddProject,
    projects,
    handleSelectProject,
    selectedProjectId,
  } = useProjects();
  const { isLoading: isFetching, getProjects } = useGetProjects();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <aside className="flex flex-col w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <div className="mb-auto">
        <SidebarHeader />
        <AddProjectButton handleStartAddProject={handleStartAddProject} />
        {isFetching ? (
          <LoadingIndicator />
        ) : (
          <ProjectList
            projects={projects}
            selectedProjectId={selectedProjectId}
            handleSelectProject={handleSelectProject}
          />
        )}
      </div>
      <LogoutButton isLoading={isLoggingOut} logoutUser={logoutUser} />
    </aside>
  );
}
