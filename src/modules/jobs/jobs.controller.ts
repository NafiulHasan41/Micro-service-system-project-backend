import { Request, Response } from "express";
import { JobService } from "./jobs.service";
import { JobUpdateValidationSchema, JobValidationSchema } from "./jobs.interface";




const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedJob = JobValidationSchema.parse(req.body);
    const job = await JobService.createJob(validatedJob);
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Invalid input or job creation failed",
    });
  }
};

const getJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const job = await JobService.getJobById(id);
    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error fetching job",
    });
  }
};

const updateJob = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const validatedData = JobUpdateValidationSchema.parse(req.body);
    const job = await JobService.updateJobById(id, validatedData);
    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error updating job",
    });
  }
};

const deleteJob = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await JobService.deleteJobById(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Job not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Error deleting job",
    });
  }
};


export const jobController = {
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
