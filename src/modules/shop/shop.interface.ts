import { Document } from "mongoose";
import { z } from "zod";

// Shop Schema
export const ShopBaseSchema = z.object({
  name: z.string().nonempty("Shop name is required"),
  description: z.string().optional(), 
  categories: z.array(z.string()).nonempty("At least one category is required"), // categories (e.g., Grocery, Electronics)
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must have exactly two numbers").optional(), // must be offline or online
    address: z.string().nonempty("Address is required"),
  }),
  contact: z.object({
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email().optional(),
  }),
  openingHours: z.object({
    open: z.string().nonempty("Opening time is required"),
    close: z.string().nonempty("Closing time is required"),
  }),
  specialClosing: z.array(z.string()).optional(), 
  rating: z.number().min(0).max(5).default(0), 
  posterId: z.string().nonempty("Poster ID is required"), 
});

export const ShopValidationSchema = ShopBaseSchema;

export const ShopUpdateValidationSchema = ShopBaseSchema.partial();

export type IShop = z.infer<typeof ShopValidationSchema>;
export type IShop_Document = IShop & Document;
