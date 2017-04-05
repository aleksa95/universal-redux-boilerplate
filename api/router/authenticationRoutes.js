import express from 'express';
import { signUp, login, authenticate, resetPassword } from '../controllers/authenticationCtrl';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUp);

authRoutes.post('/login', login);

authRoutes.post('/reset-password', resetPassword);

authRoutes.get('/authenticate', authenticate);

export default authRoutes;
