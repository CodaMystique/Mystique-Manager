import React, { useState } from "react";
import useAddProject from "../../../hooks/useAddProject.js";
import useProjects from "../../../hooks/useProjects.js";
import { validateProjectData } from "../../../utils/validator.js";
import FormButtons from "./FormButtons.jsx";
import ProjectInputs from "./ProjectInputs.jsx";
import FormMenu from "./FormMenu.jsx";

export default function NewProject() {
  const { isLoading, addProject } = useAddProject();
  const { handleCancelAddProject } = useProjects();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSave() {
    console.log(title, description, dueDate);

    if (!validateProjectData({ title, description, dueDate })) return;

    addProject({
      title,
      description,
      dueDate,
    });
  }

  return (
    <div className="w-[35rem] mt-12">
      <FormMenu>
        <FormButtons
          isLoading={isLoading}
          handleCancel={handleCancelAddProject}
          handleSave={handleSave}
        />
      </FormMenu>
      <ProjectInputs
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onDueDateChange={setDueDate}
      />
    </div>
  );
}
