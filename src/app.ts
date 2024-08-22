import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import config from './config/server.config';
import authRoutes from './modules/auth/auth.routes';

const app: Application = express();

// Middleware
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

//Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

//Application Routes
app.use('/auth', authRoutes);

//Home Routes
app.use((req, res, next) => {
  res.status(200).json({ message: 'Chatter api responding' });
});

//Not Found Routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});
export default app;
