import mongoose, { Schema, Document } from "mongoose";
import { IJobClick } from "./jobClick.interface";

const LocationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
    enum: ["Point"],
  },
  coordinates: {
    type: [Number],
    default: [0, 0],
  },
  address: {
    type: String,
    required: true,
  },
});

const JobClickSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    jobType: {
      type: String,
      enum: ["paid", "volunteer"],
      required: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: LocationSchema,
      required: true,
    },
    jobTags: {
      type: [String],
      default: [],
    },
    jobSalary: {
      type: Number,
    },
    clickedAt: {
      type: Date,
      default: Date.now,
    },
    actionType: {
      type: String,
      enum: ["view", "apply", "join"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster queries
JobClickSchema.index({ userId: 1 });
JobClickSchema.index({ jobId: 1 });
JobClickSchema.index({ clickedAt: -1 });

export type JobClickDocument = Document & IJobClick;
export const JobClick = mongoose.model<JobClickDocument>(
  "JobClick",
  JobClickSchema
);
