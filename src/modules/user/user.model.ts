import  { Schema, model } from "mongoose";
import { IUser, IUser_Document } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, 
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "serviceProvider", "shopOwner","admin"], default: "user" },
    imageURL: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: { type: [Number] },
      address: { type: String },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this as IUser_Document;
  if (!user.isModified("password")) return next();

  const pass = await bcrypt.hash(user.password, Number(config.bcryptSalt));
  user.password = pass;

  next();
});

UserSchema.post("save", function (doc: any, next: (err?: any) => void) {
  doc.password = "********";
  next();
});

UserSchema.post("find", function (docs: any[], next: (err?: any) => void) {
  docs.forEach((doc) => (doc.password = "********"));
  next();
});



export const UserModel = model<IUser>("User", UserSchema);
