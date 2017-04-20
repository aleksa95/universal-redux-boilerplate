import express from 'express';
import RateLimit from 'express-rate-limit';
import { signUp, login, authenticate, forgotPassword, checkResetToken, resetPassword } from '../controllers/authenticationCtrl';

var createAccountLimiter = new RateLimit({
  windowMs: 60*60*1000, // 1 hour window
  delayAfter: 1, // begin slowing down responses after the first request
  delayMs: 3*1000, // slow down subsequent responses by 3 seconds per request
  max: 5, // start blocking after 5 requests
  message: "Too many accounts created from this IP, please try again after an hour"
});

const authRoutes = express.Router();

authRoutes.post('/sign-up', createAccountLimiter, signUp);

authRoutes.post('/login', login);

authRoutes.post('/forgot-password', forgotPassword);

authRoutes.post('/check-reset-token', checkResetToken);

authRoutes.post('/reset-password', resetPassword);

authRoutes.get('/authenticate', authenticate);

export default authRoutes;
