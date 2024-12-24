import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: IUser) => {
  const user = await UserModel.create(userData);
  return user;
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
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};