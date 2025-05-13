import { Document, Types } from "mongoose";
import { z } from "zod";

// Apply Task Schema
export const ApplyBaseSchema = z.object({
  user: z.object({
    userId: z.string().nonempty("User ID is required"),
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().regex(/^01[35789]\d{8}$/, "Invalid phone number in Bangladesh").optional(),
  }).refine(data => data.email || data.phone, { message: "Either email or phone is required" }),
  resumeLink: z.string().url("Invalid URL format").optional(), 
  description: z.string().nonempty("Cover letter is required"), 
  taskId: z.string().nonempty("Task ID is required"),
  status: z.enum(['pending', 'accepted', 'rejected']),
  isComplete: z.boolean().optional(),
 
});

export const ApplyValidationSchema = ApplyBaseSchema;

export const ApplyUpdateValidationSchema = ApplyBaseSchema.partial();

export interface IApply {
  user: {
    userId: Types.ObjectId; 
    name: string;
    email?: string;
    phone?: string;
  };
  resumeLink?: string;
  description: string;
  taskId: Types.ObjectId; 
  status: 'pending' | 'accepted' | 'rejected';
  isComplete?: boolean;
}

export type IApply_Document = IApply & Document;
