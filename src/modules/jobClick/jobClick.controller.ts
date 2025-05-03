import { Request, Response, NextFunction } from 'express';
import { JobClickService } from './jobClick.service';
import { IJobClickCreate } from './jobClick.interface';
import { Types } from 'mongoose';

export class JobClickController {
  private jobClickService = new JobClickService();

  /**
   * Record a job click event
   */
  public recordJobClick = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id; 
      
      if (!userId) {
        res.status(401).json({ success: false, message: 'User not authenticated' });
        return;
      }

      const { 
        jobId , 
        jobType, 
        jobCategory, 
        jobLocation, 
        jobTags, 
        jobSalary, 
        actionType 
      } = req.body;

      // Validate required fields
      if (!jobId || !jobType || !jobCategory || !jobLocation || !actionType) {
        res.status(400).json({ success: false, message: 'Missing required job click data' });
        return;
      }

      const jobClickData: IJobClickCreate = {
        userId : new Types.ObjectId(userId) ,
        jobId : new Types.ObjectId(jobId),
        jobType,
        jobCategory,
        jobLocation,
        jobTags: jobTags || [],
        jobSalary,
        actionType
      };

      const jobClick = await this.jobClickService.recordJobClick(jobClickData);
      res.status(201).json({
        success: true,
        data: jobClick
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all click data for a specific user
   */
  public getUserClickData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        res.status(400).json({ success: false, message: 'User ID is required' });
        return;
      }

      const clickData = await this.jobClickService.getUserClickData(userId);
      
      res.status(200).json({
        success: true,
        count: clickData.length,
        data: clickData
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all users' click data with pagination
   */
  public getAllClickData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
      
      const clickData = await this.jobClickService.getAllClickData(limit, skip);
      
      res.status(200).json({
        success: true,
        count: clickData.length,
        data: clickData
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get click data by date range
   */
  public getClickDataByDateRange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        res.status(400).json({ success: false, message: 'Start date and end date are required' });
        return;
      }

      const clickData = await this.jobClickService.getClickDataByDateRange(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      
      res.status(200).json({
        success: true,
        count: clickData.length,
        data: clickData
      });
    } catch (error) {
      next(error);
    }
  };
}