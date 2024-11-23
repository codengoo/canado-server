import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import { applyRoute } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:9000', 'http:14.191.38.253:9000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'http://3.25.58.118:8888'],
        scriptSrc: ["'self'", "'unsafe-inline'", 'http://3.25.58.118:8888'],
        connectSrc: ["'self'", 'http://3.25.58.118:8888'],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  }),
);

applyRoute(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
