/* eslint import/no-extraneous-dependencies: 0, no-console: 0 */
import express from 'express';
import webpack from 'webpack';

const { host, port, webpackPort, webpackHost } = require('../config/env');
const webpackConfig = require('../config/webpack-dev.config');
const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${webpackHost}:${webpackPort}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  }
};

const app = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(webpackPort, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Webpack development server listening on port ${webpackPort}`);
  }
});