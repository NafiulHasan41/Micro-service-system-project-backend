import { Document } from "mongoose";
import { z } from "zod";

// Service Provider Schema
export const ServiceProviderBaseSchema = z.object({
  name: z.string().nonempty("Service provider name is required"),
  category: z.string().nonempty("Category is required"), 
  description: z.string().optional(), 
  tags: z.array(z.string()).optional(), 
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must have exactly two numbers").optional(),
    address: z.string().nonempty("Address is required"),
  }),// location of all the modules will be changed when the api is used and what data we get according to it
  
  contact: z.object({
    phone: z.string().nonempty("Phone number is required"),
    email: z.string().email().optional(),
  }),
  rating: z.number().min(0).max(5).default(0), 
  reviews: z.array(z.string()).optional(), 
  posterId: z.string().nonempty("Poster ID is required"),
});

export const ServiceProviderValidationSchema = ServiceProviderBaseSchema;

export const ServiceProviderUpdateValidationSchema = ServiceProviderBaseSchema.partial();

export type IServiceProvider = z.infer<typeof ServiceProviderValidationSchema>;
export type IServiceProvider_Document = IServiceProvider & Document;
