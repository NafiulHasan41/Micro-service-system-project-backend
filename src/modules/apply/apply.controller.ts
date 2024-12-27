import { Request, Response } from "express";
import { ApplyService } from "./apply.service";

 const createApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await ApplyService.createApplication(req.body);
    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating application",
    });
  }
};

 const getApplicationById = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error retrieving application",
    });
  }
};

 const updateApplicationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await ApplyService.updateApplicationById(req.params.id, req.body);
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
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating application",
    });
  }
};

 const deleteApplicationById = async (req: Request, res: Response): Promise<void> => {
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
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error deleting application",
    });
  }
};

 const getApplicationsByTaskId = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await ApplyService.getApplicationsByTaskId(req.params.taskId);
    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      data: applications,
    });
  } catch (error:any) {
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