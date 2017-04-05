import express from 'express';
import { signUp, login, authenticate, forgotPassword, checkResetToken, resetPassword } from '../controllers/authenticationCtrl';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUp);

authRoutes.post('/login', login);

authRoutes.post('/forgot-password', forgotPassword);

authRoutes.post('/check-reset-token', checkResetToken);

authRoutes.post('/reset-password', resetPassword);

authRoutes.get('/authenticate', authenticate);

export default authRoutes;
