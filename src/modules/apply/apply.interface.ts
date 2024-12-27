import { Document } from "mongoose";
import { z } from "zod";

// Apply Task Schema
export const ApplyBaseSchema = z.object({
  user: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().regex(/^01[35789]\d{8}$/, "Invalid phone number in Bangladesh").optional(),
  }).refine(data => data.email || data.phone, { message: "Either email or phone is required" }),
  resumeLink: z.string().url("Invalid URL format").optional(), // link to uploaded PDF which I will handle letter resume/CV
  description: z.string().nonempty("Cover letter is required"), // cover letter to convince the employer that your the best suited
  taskId: z.string().nonempty("Task ID is required"), // id of the task being applied to to track the applications and sent them to poster
});

export const ApplyValidationSchema = ApplyBaseSchema;

export const ApplyUpdateValidationSchema = ApplyBaseSchema.partial();

export type IApply = z.infer<typeof ApplyValidationSchema>;
export type IApply_Document = IApply & Document;
