import express from 'express';
import { signUp, login, authenticate } from '../controllers/authenticationCtrl';

const authRoutes = express.Router();

authRoutes.post('/sign-up', signUp);

authRoutes.post('/login', login);

authRoutes.get('/authenticate', authenticate);

export default authRoutes;
