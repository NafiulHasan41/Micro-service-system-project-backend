import express from "express";
import { jobController } from "./jobs.controller";


const router = express.Router();

router.post("/", jobController.createJob); 
router.get("/:id", jobController.getJobById); 
router.put("/:id", jobController.updateJob); 
router.delete("/:id", jobController.deleteJob); 


export const jobRoutes = router;
