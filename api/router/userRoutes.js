import express from 'express';
import { testEndpoint, requireRole } from '../controllers/userCtrl';
import Constants from '../data/Constants';
import { authCheckMiddleware } from '../controllers/authenticationCtrl';

const userRoutes = express.Router();

userRoutes.get('/test', authCheckMiddleware, requireRole(Constants.ROLES.USER), testEndpoint);

export default userRoutes;
