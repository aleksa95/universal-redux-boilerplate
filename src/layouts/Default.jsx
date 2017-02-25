/* eslint react/prefer-stateless-function: 0, react/no-danger: 0, react/forbid-prop-types: 0 */
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Default extends Component {


  render() {
      const { assets, component, store } = this.props;
      const content = component ? ReactDOM.renderToString(component) : '';
      return (
          <html lang="en">
          <head>
              <title>Hello, world!</title>
              {/* styles (will be present only in production with webpack extract text plugin) */}
              {Object.keys(assets.styles).map((style, key) =>
                  <link href={assets.styles[style]} key={key} media="screen, projection"
                        rel="stylesheet" type="text/css" charSet="UTF-8"/>
              )}

              {/* (will be present only in development mode) */}
              {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
              {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
              { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('../containers/home.scss')._style}}/> : null }
          </head>
          <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
          </body>
          </html>
      );
  }
}

Default.propTypes = {
    assets: React.PropTypes.object,
    component: React.PropTypes.node,
    store: React.PropTypes.object,
};
