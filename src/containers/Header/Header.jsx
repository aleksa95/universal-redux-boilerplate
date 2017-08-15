import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

  render() {
    const styles = require('./_header.scss');
    return (
      <header className={ styles.header }>
        <div className={ styles['links-wrapper'] }>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </header>
    );
  }
}

export default Header;
