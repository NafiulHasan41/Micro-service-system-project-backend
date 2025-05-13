import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.routes';
import { jobRoutes } from './modules/jobs/jobs.routes';
import { serviceProviderRoute } from './modules/service/service.router';
import { jobClickRoutes } from './modules/jobClick/jobClick.route';
import fs from "fs";
import path from "path";
import { applyRoutes } from './modules/apply/apply.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


//application routes
const tempDir = path.join(__dirname, "../uploads/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/service-providers", serviceProviderRoute  );
app.use("/api/job-clicks", jobClickRoutes);
app.use("/api/applications", applyRoutes )

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
