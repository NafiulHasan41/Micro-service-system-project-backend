import { IJobClickCreate, IJobClick } from './jobClick.interface';
import { JobClick } from './JobClick.model';
import { Types } from 'mongoose';

export class JobClickService {
  /**
   * Record a new job click event
   */
  public async recordJobClick(jobClickData: IJobClickCreate): Promise<IJobClick> {
    try {
      const newJobClick = new JobClick({
        ...jobClickData,
        clickedAt: jobClickData.clickedAt || new Date()
      });
      
      return await newJobClick.save();
    } catch (error : any) {
      throw new Error(`Failed to record job click: ${error.message}`);
    }
  }

  /**
   * Get all click data for a specific user
   */
  public async getUserClickData(userId: string): Promise<IJobClick[]> {
    try {
      return await JobClick.find({ 
        userId: new Types.ObjectId(userId) 
      })
      .sort({ clickedAt: -1 })
      .lean();
    } catch (error : any) {
      throw new Error(`Failed to get user click data: ${error.message}`);
    }
  }

  /**
   * Get all users' click data (for batch ML processing)
   */
  public async getAllClickData(limit?: number, skip?: number): Promise<IJobClick[]> {
    try {
      const query = JobClick.find()
        .sort({ clickedAt: -1 });
      
      if (skip) {
        query.skip(skip);
      }
      
      if (limit) {
        query.limit(limit);
      }
      
      return await query.lean();
    } catch (error : any) {
      throw new Error(`Failed to get all click data: ${error.message}`);
    }
  }

  /**
   * Get click data within a date range
   */
  public async getClickDataByDateRange(startDate: Date, endDate: Date): Promise<IJobClick[]> {
    try {
      return await JobClick.find({
        clickedAt: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .sort({ clickedAt: -1 })
      .lean();
    } catch (error : any) {
      throw new Error(`Failed to get click data by date range: ${error.message}`);
    }
  }
}