import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createProject,
  deleteProject,
  getProjects,
  getProjectById,
} from "../controllers/projects.controller.js";

const router = express.Router();

router.get("/", protectRoute, getProjects);
router.get("/:projectId", protectRoute, getProjectById);
router.post("/create", protectRoute, createProject);
router.delete("/delete/:projectId", protectRoute, deleteProject);

export default router;
