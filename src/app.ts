import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import config from './config/server.config';
import HttpResponse from './helpers/http-response';
import authRoutes from './modules/auth/auth.routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Session Manager
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

// Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Application Routes
app.use('/auth', authRoutes);

// Home Routes
app.get('/', (req: Request, res: Response) => {
  const response = HttpResponse.success(null, 'Chatter api responding');
  return response.send(res);
});

// Not Found Routes
app.use((req: Request, res: Response) => {
  const response = HttpResponse.notFound();
  return response.send(res);
});

export default app;
