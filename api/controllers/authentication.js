import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../../config/env';
import passport from 'passport';

function generateToken(user) {
  return jwt.sign(user, config.secret);
}

function setUserInfo(request) {
  return {
    _id: request._id,
    email: request.email,
    role: request.role,
  };
}

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.json(403, info);
    }

    let userInfo = setUserInfo(res);
    res.status(200).json({
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo
    });

  })(req, res, next);
};


exports.register = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.', type: 'email'});
  }

  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.', type: 'password' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'That email address is already in use.' , type: 'email'});
    }

    let user = new User({
      email: email,
      password: password,
      profile: { firstName: firstName, lastName: lastName }
    });

    user.save(function(err, user) {
      if (err) { return next(err); }

      // Subscribe member to Mailchimp list
      // mailchimp.subscribeToNewsletter(user.email);

      // Respond with JWT if user was created

      let userInfo = setUserInfo(user);

      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
};

exports.roleAuthorization = function(role) {
  return function(req, res, next) {
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  }
};

exports.authenticate = function (req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Must have token in header'});
  }

  jwt.verify(token, config.secret, function (err, user) {
    if (err) return res.status(401).json({message: err});

    res.json({
      user: {
        'email': user.email,
        'role': user.role
      },
      token: 'JWT ' + generateToken(user),
    });
  });

};

exports.authCheckMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) return res.status(401).json({message: 'Must have token in header'});

  return jwt.verify(token, config.secret, (err) => {
    if (err) { return res.status(401).json({message: 'Token not valid'}); }

    return next();
  });
};
