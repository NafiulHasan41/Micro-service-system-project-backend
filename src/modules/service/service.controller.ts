import { Request, Response } from "express";
import { serviceProviderService } from "./service.service";


const createServiceProvider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const serviceProvider = await serviceProviderService.createServiceProvider(req.body);
    return res.status(201).json(serviceProvider);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const getServiceProviderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const serviceProvider = await serviceProviderService.getServiceProviderById(req.params.id);
    if (!serviceProvider) return res.status(404).json({ error: "Service Provider not found" });
    return res.json(serviceProvider);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const updateServiceProvider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const serviceProvider = await serviceProviderService.updateServiceProvider(req.params.id, req.body);
    if (!serviceProvider) return res.status(404).json({ error: "Service Provider not found" });
    return res.json(serviceProvider);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteServiceProvider = async (req: Request, res: Response): Promise<Response> => {
  try {
    const serviceProvider = await serviceProviderService.deleteServiceProvider(req.params.id);
    if (!serviceProvider) return res.status(404).json({ error: "Service Provider not found" });
    return res.json({ message: "Service Provider deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllServiceProviders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const serviceProviders = await serviceProviderService.getAllServiceProviders(req.query);
    return res.json(serviceProviders);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const serviceProviderController = {
  createServiceProvider,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
  getAllServiceProviders,
};
