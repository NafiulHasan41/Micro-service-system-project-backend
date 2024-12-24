import config from "../../config";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";

const createUser = async (userData: IUser) => {
   // Checking if user exists with the same email or phone  as my system is built on email or phone 
   const existingUser = await UserModel.findOne({
    $or: [{ email: userData.email }, { phone: userData.phone }],
  });

  if (existingUser) {
    throw new Error("User already exists with this email or phone number");
  }

  // Create the new user using email or phone
  const user = await UserModel.create(userData);
  return user;
};

const getUserByEmailOrPhone = async (identifier: string) => {
  const user = await UserModel.findOne({
    $or: [{ email: identifier }, { phone: identifier }],
  });
  return user;
};

const updatePassword = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Verifying current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Current password is incorrect");
  }

  // Hashing the new password
  const hashedPassword = await bcrypt.hash(newPassword, Number(config.bcryptSalt));
  user.password = hashedPassword;

  // Save the password updated user
  await user.save();
  return { message: "Password updated successfully" };
};

const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};

const getUserById = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

const updateUserById = async (id: string, updateData: Partial<IUser>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });
  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  getUserByEmailOrPhone,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updatePassword
};
