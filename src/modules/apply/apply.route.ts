import express from "express";
import {
  applyController,
  createCommunityApplication,
  createJobApplication,
  jobApplicationMiddleware,
} from "./apply.controller";

const router = express.Router();

router.post(
  "/job",
  jobApplicationMiddleware,
  createJobApplication
);
router.post("/community", createCommunityApplication);
router.post("/", applyController.createApplication);
router.get("/:id", applyController.getApplicationById);
router.patch("/:id", applyController.updateApplicationById);
router.delete("/:id", applyController.deleteApplicationById);
router.get("/task/:taskId", applyController.getApplicationsByTaskId);

export const applyRoutes = router;
