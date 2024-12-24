import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/users", userRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
