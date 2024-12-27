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

const getUserJobs = async (posterId: string): Promise<IJob[]> => {
    const jobs = await JobModel.find({ posterId });
    return jobs;
  };
  
  const getFilteredJobs = async (
    filters: {
      type?: string;
      minSalary?: number;
      maxSalary?: number;
      job_category?: string;
      tags?: string[];
      search?: string;
    },
    page: number = 1,
    limit: number = 10
  ): Promise<any> => {
    const match: any = {};
  
    // filters applied
    if (filters.type) match.type = filters.type; // Paid or volunteer
    if (filters.job_category) match.job_category = filters.job_category; // Job category
    if (filters.tags) match.tags = { $all: filters.tags }; // Match all specified tags
    if (filters.minSalary || filters.maxSalary) {
      match.salary = {};
      if (filters.minSalary) match.salary.$gte = filters.minSalary; // Minimum salary
      if (filters.maxSalary) match.salary.$lte = filters.maxSalary; // Maximum salary
    }
    if (filters.search) {
      match.$or = [
        { job_title: { $regex: filters.search, $options: "i" } }, // Search in title
        { description: { $regex: filters.search, $options: "i" } }, // Search in description
      ];
    }
  
    // Aggregation pipeline
    const jobs = await JobModel.aggregate([
      { $match: match }, // Apply match filters
      {
        $lookup: {
          from: "users", // Name of the user collection
          localField: "posterId", // Field in jobs
          foreignField: "_id", // Field in users
          as: "posterDetails", // Output field
        },
      },
      { $unwind: "$posterDetails" }, // Deconstruct array for easier access
      {
        $project: {
          job_title: 1,
          type: 1,
          location: 1,
          description: 1,
          tags: 1,
          salary: 1,
          job_category: 1,
          posterDetails: {
            name: 1,
            imageURL: 1,
            location: 1,
          },
        },
      },
      { $skip: (page - 1) * limit }, // Pagination: skip
      { $limit: limit }, // Pagination: limit
    ]);
  
    const totalJobs = await JobModel.countDocuments(match); // Total matching documents
    return {
      jobs,
      total: totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
    };
  };



export const JobService = {
  createJob,
  getJobById,
  updateJobById,
  deleteJobById,
  getUserJobs,
  getFilteredJobs,
};
