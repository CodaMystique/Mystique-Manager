import NoProjectImag from "../../assets/no-projects.png";
import Button from "../Helper/Button.jsx";
import useProjects from "../../hooks/useProjects";
import { Link } from "react-router-dom";

export default function NoProjectSelected() {
  const { handleStartAddProject } = useProjects();

  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={NoProjectImag}
        alt="An empty task list"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Link to={"/new-project"}>
          <Button onClick={handleStartAddProject}>Create New Project</Button>
        </Link>
      </p>
    </div>
  );
}
