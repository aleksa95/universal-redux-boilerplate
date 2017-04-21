import express from 'express';
import RateLimit from 'express-rate-limit';
import { signUp, login, authenticate, forgotPassword, checkResetToken, resetPassword, logout } from '../controllers/authenticationCtrl';
import passport from 'passport';
import passportConfig from '../../config/passport'; // eslint-disable-line

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

authRoutes.get('/logout', logout);

authRoutes.post('/forgot-password', forgotPassword);

authRoutes.post('/check-reset-token', checkResetToken);

authRoutes.post('/reset-password', resetPassword);

authRoutes.get('/authenticate', authenticate);

// route for facebook authentication and login
authRoutes.get('/facebook', passport.authenticate('facebook', { scope : ['email'] }));

// handle the callback after facebook has authenticated the user
authRoutes.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/profile',
  failureRedirect : '/'
}), function(req, res){ console.log(req.isAuthenticated(), req.user) });



export default authRoutes;
