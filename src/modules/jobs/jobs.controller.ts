import { Request, Response } from "express";
import { JobService } from "./jobs.service";
import { JobUpdateValidationSchema, JobValidationSchema } from "./jobs.interface";
import { UserModel } from "../user/user.model";




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
    const poster = await UserModel.findById(job.posterId);
    
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: {
        ...job.toObject(),
        poster: poster || null,
      },
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

const getUserJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log(req.user);
      const posterId = req.user?.id; 
      if (!posterId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized: User ID not found",
        });
        return;
      }
  
      const jobs = await JobService.getUserJobs(posterId);
      res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        data: jobs,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Error fetching jobs",
      });
    }
  };
  
  const getFilteredJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        type,
        minSalary,
        maxSalary,
        job_category,
        tags,
        search,
        page = 1,
        limit = 10,
      } = req.query;
  
      const filters = {
        type: type as string,
        minSalary: minSalary ? Number(minSalary) : undefined,
        maxSalary: maxSalary ? Number(maxSalary) : undefined,
        job_category: job_category as string,
        tags: tags ? (tags as string).split(",") : undefined,
        search: search as string,
      };
  
      const result = await JobService.getFilteredJobs(filters, Number(page), Number(limit));
      res.status(200).json({
        success: true,
        message: "Filtered jobs fetched successfully",
        data: result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || "Error fetching filtered jobs",
      });
    }
  };
  


export const jobController = {
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getUserJobs,
  getFilteredJobs,
};
