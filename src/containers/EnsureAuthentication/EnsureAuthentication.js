import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { redirect } from '../../actions/auth-actions';
import { connect } from 'react-redux';

class EnsureAuthentication extends Component {
  componentWillMount() {
    const isAuthenticated = () => {
      if (!this.props.isUserAuthenticated && !this.props.isUserAuthenticating) {
        clearInterval(interval); // eslint-disable-line
        this.props.redirect('/login');
      }
    };

    const interval = setInterval(isAuthenticated, 100);
  }

  render() {
    return this.props.children;
  }
}

EnsureAuthentication.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  isUserAuthenticating: PropTypes.bool.isRequired,
  children: PropTypes.any,
  redirect: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isUserAuthenticated: state.auth.authenticated,
    isUserAuthenticating: state.auth.authenticating
  };
}

export default connect(mapStateToProps, { redirect })(EnsureAuthentication);
