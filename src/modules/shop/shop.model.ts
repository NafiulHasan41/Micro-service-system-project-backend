import mongoose, { Schema } from "mongoose";
import { IShop } from "./shop.interface";

const ShopSchema = new Schema<IShop>({
  name: { type: String, required: true },
  description: { type: String },
  categories: { type: [String], required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number],},
    address: { type: String, required: true },
    
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  openingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
  specialClosing: { type: [String] },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  posterId: { type: String, required: true },
}, { timestamps: true });



export const ShopModel = mongoose.model<IShop>("Shop", ShopSchema);
