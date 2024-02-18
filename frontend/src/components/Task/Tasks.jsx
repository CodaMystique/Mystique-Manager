import NewTask from "./NewTask.jsx";
import useProjects from "../../hooks/useProjects";

export default function Tasks() {
  const { selectedProject, handleDeleteTask, selectedProjectId } =
    useProjects();

  const selectedProjectTasks = selectedProject.tasks;

  console.log(selectedProjectTasks);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask></NewTask>
      {selectedProjectTasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      )}
      {selectedProjectTasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map((task) => (
            <li key={task._id} className="flex justify-between my-4">
              <span>{task.text}</span>
              <button
                className="text-stone-700 hover:text-red-500"
                onClick={() => handleDeleteTask(selectedProjectId, task._id)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
