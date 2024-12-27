import { IApply } from "./apply.interface";
import { ApplyModel } from "./apply.model";

const createApplication = async (applicationData: IApply) => {
  const application = await ApplyModel.create(applicationData);
  return application;
};

const getApplicationById = async (applicationId: string) => {
  const application = await ApplyModel.findById(applicationId);
  return application;
};

const updateApplicationById = async (applicationId: string, updateData: Partial<IApply>) => {
  const updatedApplication = await ApplyModel.findByIdAndUpdate(applicationId, updateData, { new: true });
  return updatedApplication;
};

const deleteApplicationById = async (applicationId: string) => {
  const result = await ApplyModel.findByIdAndDelete(applicationId);
  return result;
};

const getApplicationsByTaskId = async (taskId: string) => {
  const applications = await ApplyModel.find({ taskId });
  return applications;
};

export const ApplyService = {
  createApplication,
  getApplicationById,
  updateApplicationById,
  deleteApplicationById,
  getApplicationsByTaskId,
};
