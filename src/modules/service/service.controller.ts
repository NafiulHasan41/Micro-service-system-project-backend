import { Request, Response } from "express";
import { serviceProviderService } from "./service.service";


const createServiceProvider = async (req: Request, res: Response) => {
  try {
    const serviceProvider = await serviceProviderService.createServiceProvider(req.body);
     res.status(201).json(serviceProvider);
     return
  } catch (error: any) {
    res.status(400).json({
        success: false,
        message: error || "Invalid input or service provider creation failed",
      });
     return
  }
};

const getServiceProviderById = async (req: Request, res: Response) => {
  try {
    const serviceProvider = await serviceProviderService.getServiceProviderById(req.params.id);
    if (!serviceProvider) {
         res.status(404).json({ error: "Service Provider not found" });
         return
        }
     res.json(serviceProvider);
        return
  } catch (error: any) {
    res.status(400).json({
        success: false,
        message: error || "Error fetching service provider",
      });
     return
  }
};

const updateServiceProvider = async (req: Request, res: Response) => {
  try {
    const serviceProvider = await serviceProviderService.updateServiceProvider(req.params.id, req.body);
    if (!serviceProvider) 
        { res.status(404).json({ error: "Service Provider not found" });
         return
    }
     res.json(serviceProvider);
     return
  } catch (error: any) {
    res.status(400).json({
        success: false,
        message: error || "Invalid input or service provider update failed",
      });
     return
  }
};

const deleteServiceProvider = async (req: Request, res: Response)=> {
  try {
    const serviceProvider = await serviceProviderService.deleteServiceProvider(req.params.id);
    if (!serviceProvider) {
        res.status(404).json({ error: "Service Provider not found" });
        return
    }
     res.json({ message: "Service Provider deleted successfully" });
      return
  } catch (error: any) {
    res.status(400).json({
        success: false,
        message: error || "Error deleting service provider",
      });
     return
  }
};
const getAllServiceProviders = async (req: Request, res: Response) => {
    try {
      const serviceProviders = await serviceProviderService.getAllServiceProviders(req.query);
       res.json(serviceProviders);
       return
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error || "Error fetching service providers",
          });
         return
    }
  };



export const serviceProviderController = {
  createServiceProvider,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders
};
