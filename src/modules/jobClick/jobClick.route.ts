import { Router } from 'express';
import { JobClickController } from './jobClick.controller';
import { protect } from '../../middlewares/authMiddleware';

const router = Router();
const jobClickController = new JobClickController();

// Route to record job click events (requires auth)
router.post('/record', protect , jobClickController.recordJobClick);

// Routes to get click data (these can be protected as needed)
router.get('/user/:userId', jobClickController.getUserClickData);
router.get('/all', jobClickController.getAllClickData);
router.get('/date-range', jobClickController.getClickDataByDateRange);

export const jobClickRoutes = router;