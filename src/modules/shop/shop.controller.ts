import { Request, Response } from "express";
import { ShopService } from "./shop.service";

const createShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const shop = await ShopService.createShop(req.body);
    res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error creating shop",
    });
  }
};

const getShopById = async (req: Request, res: Response): Promise<void> => {
  try {
    const shop = await ShopService.getShopById(req.params.id);
    if (!shop) {
      res.status(404).json({
        success: false,
        message: "Shop not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Shop fetched successfully",
      data: shop,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error fetching shop",
    });
  }
};

const updateShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const shop = await ShopService.updateShopById(req.params.id, req.body);
    if (!shop) {
      res.status(404).json({
        success: false,
        message: "Shop not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: shop,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error updating shop",
    });
  }
};

const deleteShop = async (req: Request, res: Response): Promise<void> => {
  try {
    const shop = await ShopService.deleteShopById(req.params.id);
    if (!shop) {
      res.status(404).json({
        success: false,
        message: "Shop not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Shop deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error deleting shop",
    });
  }
};

const getAllShops = async (req: Request, res: Response): Promise<void> => {
  try {
    const shops = await ShopService.getAllShops(req.query);
    res.status(200).json({
      success: true,
      message: "Shops fetched successfully",
      data: shops,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Error fetching shops",
    });
  }
};

export const ShopController = {
  createShop,
  getShopById,
  updateShop,
  deleteShop,
  getAllShops,
};
