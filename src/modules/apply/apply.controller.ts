import { Request, Response } from "express";
import { ApplyService } from "./apply.service";
import {
  upload,
  uploadToGofile,
} from "../../middlewares/fileUpload.middleware";
import { IApply } from "./apply.interface";
import { ApplyModel } from "./apply.model";

// Middleware for job application route
export const jobApplicationMiddleware = [
  upload.single("resume"),
  uploadToGofile,
];

export const createJobApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Format data from FormData to match your schema
    const applicationData: IApply = {
      user: {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.mobile,
      },
      resumeLink: req.body.resumeLink, // This comes from the Gofile upload
      description: req.body.coverLetter,
      taskId: req.body.jobId,
      status: "pending",
    };

    const application = await ApplyService.createApplication(applicationData);
    res.status(201).json({
      success: true,
      message: "Job application created successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating job application",
    });
  }
};

export const createCommunityApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Format data to match your schema for community applications
    const applicationData: IApply = {
      user: {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.mobile,
      },
      description: req.body.description || req.body.reason,
      taskId: req.body.communityId,
      status: "pending",
    };

    const isApplicationExists = await ApplyModel.findOne({
      "user.userId": req.body.userId,
      taskId: req.body.communityId,
    });
    console.log("isApplicationExists", isApplicationExists);
    if (isApplicationExists) {
      res.status(400).json({
        success: false,
        message: "You have already applied for this community",
      });
      return;
    }

    const application = await ApplyService.createApplication(applicationData);
    res.status(201).json({
      success: true,
      message: "Community application created successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating community application",
    });
  }
};

const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application = await ApplyService.createApplication(req.body);
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating application",
    });
  }
};

const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application = await ApplyService.getApplicationById(req.params.id);
    if (!application) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Application retrieved successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error retrieving application",
    });
  }
};

const updateApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const application = await ApplyService.updateApplicationById(
      req.params.id,
      req.body
    );
    if (!application) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating application",
    });
  }
};

const deleteApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await ApplyService.deleteApplicationById(req.params.id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Application not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error deleting application",
    });
  }
};

const getApplicationsByTaskId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applications = await ApplyService.getApplicationsByTaskId(
      req.params.taskId
    );
    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      data: applications,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error retrieving applications",
    });
  }
};

export const applyController = {
  createApplication,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
  getApplicationsByTaskId,
};
