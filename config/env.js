module.exports = {
  secret: 'some secret',
  database: 'mongodb://aleksa:Kikiriki1@ds157799.mlab.com:57799/testing',
  port: process.env.PORT || 3000,
  apiHost: 'localhost',
  apiPort: 3001,
  webpackHost: 'localhost',
  webpackPort: 3002,
  mailerSettings: {
    service: 'SendGrid',
    auth: {
      user: 'quincygod',
      pass: 'Kikiriki1'
    }
  },
  passport: {
    local: { usernameField: 'email', passwordField : 'password', passReqToCallback : true },
    facebook: {
      clientID         : '426856600984229',
      clientSecret     : '40eb808c7162d1b3863d5b7d60b3fae3',
      callbackURL      : 'http://localhost:3000/api/auth/facebook/callback',
      profileFields    : ['id', 'displayName', 'email']
    }
  }
};
