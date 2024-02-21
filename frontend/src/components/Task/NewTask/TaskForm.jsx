// TaskForm.jsx
import React, { useState } from "react";
import TaskInput from "./TaskInput.jsx";
import AddTaskButton from "./AddTaskButton.jsx";
import useProjects from "../../../hooks/useProjects.js";
import useAddTask from "../../../hooks/useAddTask.js";
import { validateTaskData } from "../../../utils/validator.js";

function TaskForm() {
  const { selectedProjectId } = useProjects();
  const { isLoading, addTask } = useAddTask();
  const [enteredTask, setEnteredTask] = useState("");

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (!validateTaskData(enteredTask)) return;
    addTask(selectedProjectId, enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <TaskInput value={enteredTask} onChange={handleChange} />
      <AddTaskButton onClick={handleClick} isLoading={isLoading} />
    </div>
  );
}

export default TaskForm;
