/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import { Link } from 'react-router';

const NFStyles = require('./_notFound.scss');

const NotFound = () => (
  <div className={NFStyles ['not-found-wrapper']}>
    <img src={ require('../../images/not-found.png')}/>
    <h1>There is no such page</h1>
    <button><Link to="/">Go home</Link></button>
  </div>
);

export default NotFound;
