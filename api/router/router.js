import AuthenticationController from '../controllers/authentication';
import express from 'express';

module.exports = function(app) {

  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  apiRoutes.use('/auth', authRoutes);

  authRoutes.post('/register', AuthenticationController.register);

  authRoutes.post('/login', AuthenticationController.login);

  authRoutes.get('/authenticate', AuthenticationController.authenticate);

  authRoutes.post('/check-role', AuthenticationController.authCheckMiddleware , AuthenticationController.roleAuthorization);

  app.use('/api', apiRoutes);
};
