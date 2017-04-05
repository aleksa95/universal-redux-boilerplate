import express from 'express';
import { signUp, login, authenticate, forgotPassword, checkResetToken } from '../controllers/authenticationCtrl';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUp);

authRoutes.post('/login', login);

authRoutes.post('/forgot-password', forgotPassword);

authRoutes.post('/check-reset-token', checkResetToken);

authRoutes.get('/authenticate', authenticate);

export default authRoutes;
