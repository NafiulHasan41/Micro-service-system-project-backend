import mongoose, { Schema } from "mongoose";
import { IServiceProvider } from "./service.interface";


const ServiceProviderSchema = new Schema<IServiceProvider>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  tags: { type: [String], default: [] },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true },
    address: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviews: { type: [String], default: [] },
  posterId: { type: String, required: true },
}, { timestamps: true });


export const ServiceProviderModel = mongoose.model<IServiceProvider>("ServiceProvider", ServiceProviderSchema);
