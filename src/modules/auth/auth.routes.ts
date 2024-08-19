import { Router } from 'express';
import { register, login } from './auth.controller';

const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);

export default authRoutes;
