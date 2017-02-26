import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends React.Component {

  render() {
    const styles = require('./_header.scss');
    return (
      <header className={ styles.header }>
        <div className="left-section">
          <Link to="/">Logo</Link>
        </div>
        <div className="right-section">
          <Link to="/login">Login</Link>
          <Link to="/sign-up" className={ styles['sign-up-link'] }>Sign Up</Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  location: React.PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    location: state.routing.locationBeforeTransitions.location
  };
};

export default connect(mapStateToProps)(Header);
