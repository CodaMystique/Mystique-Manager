// ProjectList.jsx
import React from "react";

function ProjectList({ projects, selectedProjectId, handleSelectProject }) {
  return (
    <>
      <div className="overflow-y-auto max-h-[28rem]">
        <ul className="mt-8">
          {projects.map((project) => {
            let cssClasses =
              "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

            if (project._id === selectedProjectId) {
              cssClasses += " bg-stone-800 text-stone-200";
            } else {
              cssClasses += " text-stone-400";
            }

            return (
              <li key={project._id}>
                <button
                  className={cssClasses}
                  onClick={() => handleSelectProject(project._id)}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ProjectList;
