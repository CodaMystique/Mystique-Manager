import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createTask,
  deleteTask,
  getTasks,
} from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/:projectId", protectRoute, getTasks);
router.post("/create/:projectId", protectRoute, createTask);
router.delete("/delete/:projectId/:taskId", protectRoute, deleteTask);
// START FROM HERE CREATE CONTROLLER TO GET ALL TASKS FOR THAT USER

export default router;
