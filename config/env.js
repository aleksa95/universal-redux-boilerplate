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
  }
};
