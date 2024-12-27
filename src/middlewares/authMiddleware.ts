import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../modules/user/user.model";


interface JwtPayload {
  role: "user" | "serviceProvider" | "shopOwner" | "admin";
  name: string;
  email?: string;
  phone?: string;
  imageURL?: string;
}

// Middleware to protect routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    // Decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

    // Find the user in the database using email or phone
    const user = await UserModel.findOne({
      $or: [{ email: decoded.email }, { phone: decoded.phone }],
    });

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    // Attach user details to the request object
    req.user = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
      imageURL: user.imageURL,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Middleware to restrict access to admins
export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Forbidden: Admin access only" });
    return;
  }
  next();
};

// Middleware to restrict access to service providers and shop owners
export const serviceProviderOrShopOwnerOnly = (req: Request, res: Response, next: NextFunction): void => {
  const allowedRoles = ["serviceProvider", "shopOwner"];
  if (!allowedRoles.includes(req.user?.role || "")) {
    res.status(403).json({ message: "Forbidden: Access restricted to service providers and shop owners" });
    return;
  }
  next();
};


