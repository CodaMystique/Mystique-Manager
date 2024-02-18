import Project from "../models/project.model.js";
import isValidDate from "../utils/isValidDueDate.js";

export async function createProject(req, res) {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user._id;

    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const parsedDueDate = new Date(dueDate);

    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ error: "Invalid date" });
    }

    if (!isValidDate(parsedDueDate)) {
      return res
        .status(400)
        .json({ error: "Please provide a future or today's due date" });
    }

    const newProject = await Project.create({
      title: title,
      description: description,
      dueDate: parsedDueDate,
      ownerId: userId,
    });

    return res.status(200).json(newProject);
  } catch (error) {
    console.log("Error in createProject controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteProject(req, res) {
  const projectId = req.params.projectId;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProject controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProjects(req, res) {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ ownerId: userId }).populate("tasks");
    return res.status(200).json(projects);
  } catch (error) {
    console.log("Error in getProjects controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProjectById(req, res) {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId).populate("tasks");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.log("Error in getProjectById controller: " + error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
