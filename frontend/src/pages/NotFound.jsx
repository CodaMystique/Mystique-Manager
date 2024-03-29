import React from "react";
import NoProjectImage from "../assets/no-projects.png";
import Button from "../components/Helper/Button";
import useProjects from "../hooks/useProjects";

function NotFound() {
  const { handleStartAddProject } = useProjects();

  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={NoProjectImage}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">404 Not Found</h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={handleStartAddProject}>Create New Project</Button>
      </p>
    </div>
  );
}

export default NotFound;
