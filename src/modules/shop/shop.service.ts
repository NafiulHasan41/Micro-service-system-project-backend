import { IShop } from "./shop.interface";
import { ShopModel } from "./shop.model";

const createShop = async (shopData: IShop) => {
  const shop = await ShopModel.create(shopData);
  return shop;
};

const getShopById = async (shopId: string) => {
  const shop = await ShopModel.findById(shopId);
  return shop;
};

const updateShopById = async (shopId: string, updateData: Partial<IShop>) => {
  const updatedShop = await ShopModel.findByIdAndUpdate(shopId, updateData, { new: true });
  return updatedShop;
};

const deleteShopById = async (shopId: string) => {
  const result = await ShopModel.findByIdAndDelete(shopId);
  return result;
};

const getAllShops = async (filter: Partial<IShop> = {}) => {
  const shops = await ShopModel.find(filter);
  return shops;
};

export const ShopService = {
  createShop,
  getShopById,
  updateShopById,
  deleteShopById,
  getAllShops,
};
