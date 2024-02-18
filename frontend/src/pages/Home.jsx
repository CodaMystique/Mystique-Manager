import React from "react";
import NewProject from "../components/Project/NewProject.jsx";
import Sidebar from "../components/Sidebar/Sidebar";
import NoProjectSelected from "../components/Project/NoProjectSelected.jsx";
import SelectedProject from "../components/Project/SelectedProject.jsx";
import useProjects from "../hooks/useProjects.js";

function Home() {
  const { selectedProjectId } = useProjects();

  let content = <SelectedProject></SelectedProject>;

  if (selectedProjectId === null) {
    content = <NewProject></NewProject>;
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected></NoProjectSelected>;
  }

  return (
    <main className="h-screen flex gap-8">
      <Sidebar></Sidebar>
      {content}
    </main>
  );
}

export default Home;
