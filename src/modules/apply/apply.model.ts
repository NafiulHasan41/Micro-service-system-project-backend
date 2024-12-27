import mongoose, { Schema } from "mongoose";
import { IApply } from "./apply.interface";

const ApplySchema = new Schema<IApply>(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
    },
    resumeLink: { type: String },
    description: { type: String, required: true }, 
    taskId: { type: String, required: true }, 
  },
  { timestamps: true } 
);

export const ApplyModel = mongoose.model<IApply>("Apply", ApplySchema);
