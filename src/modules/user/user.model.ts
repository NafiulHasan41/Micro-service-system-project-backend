import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "serviceProvider", "shopOwner"], default: "user" },
    imageURL: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number] },
    },
  },
  { timestamps: true }
);

// // Index for geospatial queries
// UserSchema.index({ location: "2dsphere" });

export const UserModel = model<IUser>("User", UserSchema);