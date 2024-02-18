import { useRef } from "react";
import Input from "../Helper/Input.jsx";
import useProjects from "../../hooks/useProjects.js";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import isValidDate from "../../utils/isValidDueDate.js";

export default function NewProject() {
  const { handleAddProject, handleCancelAddProject } = useProjects();

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      toast.error("Fill all fields", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        icon: <AiOutlineCloseCircle />,
      });
      return;
    }

    if (!isValidDate(enteredDueDate)) {
      toast.error("Due date must be in current or future date", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        icon: <AiOutlineCloseCircle />,
      });
      return;
    }

    handleAddProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
    toast.success("Project added successfully", {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
      // icon: <AiOutlineCheckCircle />,
    });
  }

  return (
    <>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={handleCancelAddProject}
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label={"Name"} />
          <Input ref={description} label={"Description"} textArea />
          <Input type="date" ref={dueDate} label={"Due Date"} />
        </div>
      </div>
    </>
  );
}
