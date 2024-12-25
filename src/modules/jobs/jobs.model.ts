import mongoose, { Schema } from "mongoose";
import { IJob } from "./jobs.interface";

// Define the Job Schema
const JobSchema = new Schema<IJob>({
  type: { type: String, enum: ["paid", "volunteer"], required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number],  },
    address: { type: String, required: true },
  },
  job_title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  salary: { type: String },
  posterId: { type: String, required: true },
  deadline: { type: Date },
  job_category: { type: String, required: true },
}, { timestamps: true }); 



export const JobModel = mongoose.model<IJob>("Job", JobSchema);
