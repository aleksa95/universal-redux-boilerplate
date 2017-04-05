import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { redirect } from '../../actions/auth-actions';
import { connect } from 'react-redux';

class EnsureUnAuthentication extends Component {
  componentWillMount() {
    let interval = null;

    const isAuthenticated = () => {
      if (this.props.isUserAuthenticated && !this.props.isUserAuthenticating && (this.props.location.pathname === this.props.router.location.pathname)) {
        clearInterval(interval); // eslint-disable-line
        this.props.redirect('/');
      } else if (this.props.isUserAuthenticated && !this.props.isUserAuthenticating) {
        clearInterval(interval); // eslint-disable-line
      }
    };

    interval = setInterval(isAuthenticated, 100);
  }

  render() {
    return this.props.children;
  }
}

EnsureUnAuthentication.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  isUserAuthenticating: PropTypes.bool.isRequired,
  children: PropTypes.any,
  redirect: PropTypes.func,
  location: PropTypes.object,
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isUserAuthenticated: state.auth.authenticated,
    isUserAuthenticating: state.auth.authenticating
  };
}

export default connect(mapStateToProps, { redirect })(EnsureUnAuthentication);
