import AuthenticationController from '../controllers/authentication';
import express from 'express';
import passportService from '../../config/passport';
import passport from 'passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
        authRoutes = express.Router();

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  authRoutes.post('/check-role', AuthenticationController.roleAuthorization);

// Set url for API group routes
  app.use('/api', apiRoutes);
};
