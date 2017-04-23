/* eslint react/prefer-stateless-function: 0, react/no-danger: 0, react/forbid-prop-types: 0 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Default extends Component {
  render() {
      const { assets, component, store } = this.props;
      const content = component ? ReactDOM.renderToString(component) : '';
      return (
          <html lang="en">
          <head>
              <title>Title</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0" id="viewport-element"/>
              {Object.keys(assets.styles).map((style, key) =>
                  <link href={assets.styles[style]} key={key} media="screen, projection"
                        rel="stylesheet" type="text/css" charSet="UTF-8"/>
              )}
              { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../containers/index.scss')._style}}/> : null }
          </head>
          <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
            <script
              // removes hashes from facebook login/sign-up callback
              dangerouslySetInnerHTML={{ __html: `if (window.location.hash == "#_=_") {window.location.hash = ""; window.location = window.location.href.split('#')[0];}`}}
            />
            <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
            <script src={assets.javascript.main} charSet="UTF-8"/>
          </body>
          </html>
      );
  }
}

Default.propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store:  PropTypes.object,
};
