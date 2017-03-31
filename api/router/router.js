import express from 'express';
import authRoutes from './authenticationRoutes';
import userRoutes from './userRoutes';

module.exports = function(app) {

  const apiRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  apiRoutes.use('/user', userRoutes);

  app.use('/api', apiRoutes);
};
