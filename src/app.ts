import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
import authConfig from './config/auth.config';
import HttpResponse from './helpers/http-response';
import { startOtpCrons } from './modules/otp/otp.crons';
// Routes
import authRoutes from './modules/auth/auth.routes';
import emailRoutes from './modules/email/email.routes';
import otpRoutes from './modules/otp/otp.routes';
// API Schema
import swaggerDocument from '../API_SCHEMA.json';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Session Manager
app.use(
  session({
    secret: authConfig.session.secret,
    resave: false,
    saveUninitialized: true,
  }),
);

// Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// API DOC
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/mail', emailRoutes);
app.use('/api/otp', otpRoutes);

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

//Start otp crons
startOtpCrons();

export default app;
