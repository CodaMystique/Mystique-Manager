import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import useProjects from "../../hooks/useProjects.js";
import useAddTask from "../../hooks/useAddTask.js";

export default function NewTask() {
  const { selectedProjectId } = useProjects();
  const { isLoading, addTask } = useAddTask();

  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }
    addTask(selectedProjectId, enteredTask);
    setEnteredTask("");
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          onChange={handleChange}
          value={enteredTask}
        />
        <button
          onClick={handleClick}
          className="text-stone-700 hover:text-stone-950 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <BiLoaderCircle className="animate-spin mr-2" /> Adding Task...
            </>
          ) : (
            "Add Task"
          )}
        </button>
      </div>
    </>
  );
}
