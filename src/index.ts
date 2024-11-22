import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { applyRoute } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

applyRoute(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
