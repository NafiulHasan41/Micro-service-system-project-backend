import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserUpdateValidationSchema, UserValidationSchema } from "./user.interface";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const generateToken = (
  role: "user" | "serviceProvider" | "shopOwner" | "admin",
  name: string,
  email?: string,
  phone?: string,
  imageURL?: string
): string => {
  return jwt.sign(
    {  role, name, email, phone, imageURL },
    process.env.JWT_SECRET || '',
    { expiresIn: '1d' }
  );
};


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedUser = UserValidationSchema.parse(req.body);
    const user = await userService.createUser(validatedUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
      token: generateToken( user.role, user.name, user.email, user.phone, user.imageURL)
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err || "Invalid input or user already exists",
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body;
  try {
    const user = await userService.getUserByEmailOrPhone(identifier);
    if (!user) {
      res.status(401).json({ success: false, message: "User not found, Invalid email or phone " });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid Password" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { id: user._id, name: user.name, email: user.email, phone: user.phone , imageURL: user.imageURL},
      token: generateToken( user.role, user.name, user.email, user.phone, user.imageURL)
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Failed to login",
    });
  }
};

// for updating password 
const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    const response = await userService.updatePassword(userId, currentPassword, newPassword);
    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err || "Failed to update password",
    });
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Error fetching users",
    });
  }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Error fetching user",
    });
  }
};

const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedData = UserUpdateValidationSchema.parse(req.body);
    const updatedUser = await userService.updateUserById(id, updatedData);
    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err
    });
  }
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUserById(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Error deleting user",
    });
  }
};

export const userController = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updatePassword,
};
