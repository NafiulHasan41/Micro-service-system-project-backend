import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.routes';
import { jobRoutes } from './modules/jobs/jobs.routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
