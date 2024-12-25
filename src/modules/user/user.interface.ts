import { Document } from "mongoose";
import { z } from "zod";



export const UserBaseSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().regex(/^01[35789]\d{8}$/, "Invalid phone number in Bangladesh").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["user", "serviceProvider", "shopOwner", "admin"]).default("user"),
  imageURL: z.string().url("Invalid URL format").optional(),
  location: z
    .object({
      type: z.literal("Point").default("Point"),
      coordinates: z
        .array(z.number())
        .length(2, "Coordinates must have exactly two numbers"),
      address: z.string().optional(),
    })
    .optional(),
});
export const UserValidationSchema =  UserBaseSchema.refine(
  (data) => data.email || data.phone,
  { message: "Either email or phone is required" }
);

export const UserUpdateValidationSchema = UserBaseSchema.partial()

export type IUser = z.infer<typeof UserValidationSchema>;
export type IUser_Document = IUser & Document;
