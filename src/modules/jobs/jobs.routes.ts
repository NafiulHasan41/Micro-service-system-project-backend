import express from "express";
import { jobController } from "./jobs.controller";


const router = express.Router();

router.post("/", jobController.createJob); 
router.get("/:id", jobController.getJobById); 
router.put("/:id", jobController.updateJob); 
router.delete("/:id", jobController.deleteJob); 
router.get("/user", jobController.getUserJobs);
router.get("/", jobController.getFilteredJobs);


export const jobRoutes = router;
