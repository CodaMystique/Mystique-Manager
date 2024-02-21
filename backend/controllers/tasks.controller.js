import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import mongoose from "mongoose";

export async function createTask(req, res) {
  try {
    const { text } = req.body;
    const projectId = req.params.projectId;

    if (!mongoose.isValidObjectId(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const newTask = await Task.create({ text });

    project.tasks.push(newTask._id);

    await project.save();

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error in createTask controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTask(req, res) {
  try {
    const { projectId, taskId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.tasks = project.tasks.filter((task) => task.toString() !== taskId);

    await project.save();

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTasks(req, res) {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const tasks = await Task.find({ _id: { $in: project.tasks } });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getTasks controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
