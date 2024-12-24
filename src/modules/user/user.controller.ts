import { Request, Response } from "express";
import { userService } from "./user.service";
import { UserValidationSchema } from "./user.interface";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedUser = UserValidationSchema.parse(req.body);
    const user = await userService.createUser(validatedUser);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || "Invalid input",
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
      message: "Error fetching users",
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
      message: "Error fetching user",
    });
  }
};

const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedData = UserValidationSchema.parse(req.body);
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
      message: "Error updating user",
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
      message: "Error deleting user",
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
