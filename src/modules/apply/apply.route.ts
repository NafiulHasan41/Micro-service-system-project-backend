import express from 'express';
import { applyController } from './apply.controller';

const router = express.Router();



router.post("/", applyController.createApplication);
router.get("/:id", applyController.getApplicationById);
router.patch("/:id", applyController.updateApplicationById);
router.delete("/:id", applyController.deleteApplicationById);
router.get("/task/:taskId", applyController.getApplicationsByTaskId);

export const applyRoutes = router;