module.exports = {
  secret: 'some secret',
  database: 'mongodb://aleksa:Kikiriki1@ds115411.mlab.com:15411/testing',
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
      clientID:      '426856600984229',
      clientSecret:  '40eb808c7162d1b3863d5b7d60b3fae3',
      callbackURL:   'http://localhost:3000/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email']
    },
    'twitter': {
      consumerKey:    'aNq9MP8doQ20acNT9V4evKRF7',
      consumerSecret: 'tmoe0ww17ucPCzEva8PMcPKeAHgDJ8TaktpVcvIsAuixscenNi',
      callbackURL:    'http://localhost:3000/api/auth/twitter/callback',
      includeEmail:     true
    }
  }
};
