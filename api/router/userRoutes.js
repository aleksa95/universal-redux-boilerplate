import express from 'express';
import { testEndpoint, requireRole } from '../controllers/userCtrl';
import Constants from '../data/Constants';

const userRoutes = express.Router();

userRoutes.post('/test', requireRole(Constants.ROLES.USER), testEndpoint);

export default userRoutes;
