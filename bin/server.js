/* eslint global-require: 0 */
const path = require('path');
const webpackIsomorphicToolsConfig = require('../config/webpack-isomorphic-tools-config');
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const rootDir = path.resolve(__dirname, '..');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
    .server(rootDir, () => {
        require('./_server');
    });