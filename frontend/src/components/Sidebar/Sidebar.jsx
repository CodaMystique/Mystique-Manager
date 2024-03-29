import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import useLogout from "../../hooks/useLogout.js";
import useProjects from "../../hooks/useProjects.js";
import { Link } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";

export default function Sidebar() {
  const { isLoading, logoutUser } = useLogout();
  const {
    handleStartAddProject,
    projects,
    handleSelectProject,
    selectedProjectId,
    getProjects,
  } = useProjects();

  // useEffect(() => {
  //   getProjects();
  // }, []);

  return (
    <aside className="flex flex-col w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <div className="mb-auto">
        <h1 className="uppercase font-bold mb-8 md:text-xl">Your Projects</h1>
        <div>
          <Link to={"/new-project"}>
            <button
              className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 flex items-center"
              onClick={handleStartAddProject}
            >
              <MdAdd className="mr-2" />
              <span>Add Project</span>
            </button>
          </Link>
        </div>
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
                <Link to={`/${project._id}`}>
                  <button
                    className={cssClasses}
                    onClick={() => handleSelectProject(project._id)}
                  >
                    {project.title}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto">
        {isLoading ? (
          <BiLoaderCircle className="w-7 h-7 animate-spin" />
        ) : (
          <BiLogOut
            className="w-7 h-7 text-white cursor-pointer"
            onClick={logoutUser}
          />
        )}
      </div>
    </aside>
  );
}
