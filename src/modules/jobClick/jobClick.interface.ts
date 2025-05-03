import { Types } from 'mongoose';

export interface ILocation {
  type: string;
  coordinates: number[];
  address: string;
}

export interface IJobClick {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  jobType: 'paid' | 'volunteer';
  jobCategory: string;
  jobLocation: ILocation;
  jobTags: string[];
  jobSalary?: number;
  clickedAt: Date;
  actionType: 'view' | 'apply' | 'join';
}

export interface IJobClickCreate extends Omit<IJobClick, 'clickedAt'> {
  clickedAt?: Date;
}