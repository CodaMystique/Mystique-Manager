import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Tasks from "../Task/Tasks";
import useProjects from "../../hooks/useProjects.js";
import useDeleteProject from "../../hooks/useDeleteProject.js";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import useGetProjects from "../../hooks/useGetProjects";

export default function SelectedProject() {
  const { projects } = useProjects();
  const { isLoading, deleteProject } = useDeleteProject();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProjects } = useGetProjects();

  useEffect(() => {
    async function fetchProjects() {
      await getProjects();
    }
    fetchProjects();
  }, []);

  const selectedProject = projects.find((project) => project._id === projectId);

  const formattedDate = new Date(selectedProject.dueDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  function handleDeleteProject(id) {
    deleteProject(id).then(() => navigate("/"));
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {selectedProject.title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950 flex items-center justify-center"
            onClick={() => handleDeleteProject(selectedProject._id)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <BiLoaderCircle className="animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {selectedProject.description}
        </p>
      </header>
      <Tasks></Tasks>
    </div>
  );
}
