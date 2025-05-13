import mongoose, { Schema } from "mongoose";
import { IApply } from "./apply.interface";

const ApplySchema = new Schema<IApply>(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String },
    },
    resumeLink: { type: String },
    description: { type: String, required: true },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ApplyModel = mongoose.model<IApply>("Apply", ApplySchema);
