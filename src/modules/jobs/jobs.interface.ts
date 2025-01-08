import { Document } from "mongoose";
import { z } from "zod";

// Job Schema
export const JobBaseSchema = z.object({

  type: z.enum(["paid","volunteer"]), 
  location: z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must have exactly two numbers").optional(), 
    address: z.string().nonempty("Address is required"),
  }),
  job_title: z.string().nonempty("Job title is required"), 
  description: z.string().nonempty("Job description is required"), 
  tags: z.array(z.string()).optional(), 
  salary: z.number().optional(), 
  posterId: z.string().nonempty("Poster ID is required"), 
  deadline: z.string().optional(),
  job_category: z.string().nonempty("Job category is required"),
});

// Refine schema to ensure valid data
export const JobValidationSchema = JobBaseSchema.refine(
  (data) => data.location.coordinates && data.location.coordinates.length === 2,
  { message: "Valid location coordinates are required" }
);

// for updating job post and type checking as user is giving correct format data
export const JobUpdateValidationSchema = JobBaseSchema.partial();

// this is type definition using zod for typescript
export type IJob = z.infer<typeof JobValidationSchema>;
export type IJob_Document = IJob & Document;
