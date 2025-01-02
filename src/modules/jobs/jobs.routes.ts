import express from "express";
import { jobController } from "./jobs.controller";
import { protect } from "../../middlewares/authMiddleware";


const router = express.Router();

router.get("/user/jobs", protect , jobController.getUserJobs);
router.post("/", protect, jobController.createJob); 
router.get("/:id", jobController.getJobById); 
router.patch("/:id", protect , jobController.updateJob); 
router.delete("/:id", protect , jobController.deleteJob); 

router.get("/", jobController.getFilteredJobs);


export const jobRoutes = router;
