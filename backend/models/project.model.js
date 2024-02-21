import mongoose from "mongoose";
import isValidDueDate from "../utils/isValidDueDate.js";

const projectSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: isValidDueDate,
      message: (props) => `Due date must be in the future`,
    },
  },
  tasks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
