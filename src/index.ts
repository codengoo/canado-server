import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { applyRoute } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: 'GET,PUT,POST,DELETE',
  }),
);
app.use(helmet());

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.authenticate('session'));

applyRoute(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
