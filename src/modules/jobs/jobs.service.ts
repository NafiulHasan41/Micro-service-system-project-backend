import { IJob } from "./jobs.interface";
import { JobModel } from "./jobs.model";

const createJob = async (jobData: IJob) => {
  const job = await JobModel.create(jobData);
  return job;
};

const getJobById = async (jobId: string) => {
  const job = await JobModel.findById(jobId);
  return job;
};

const updateJobById = async (jobId: string, updateData: Partial<IJob>) => {
  const updatedJob = await JobModel.findByIdAndUpdate(jobId, updateData, { new: true });
  return updatedJob;
};

const deleteJobById = async (jobId: string) => {
  const result = await JobModel.findByIdAndDelete(jobId);
  return result;
};



export const JobService = {
  createJob,
  getJobById,
  updateJobById,
  deleteJobById,
};
