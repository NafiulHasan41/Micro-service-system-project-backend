import { z } from "zod";

export const UserValidationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["user", "serviceProvider", "shopOwner"]).default("user"),
  imageURL: z.string().url("Invalid URL format").optional(),
  location: z
    .object({
      type: z.literal("Point").default("Point"),
      coordinates: z
        .array(z.number())
        .length(2, "Coordinates must have exactly two numbers"),
    })
    .optional(),
});

export type IUser = z.infer<typeof UserValidationSchema>;