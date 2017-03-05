import React, { Component, PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import { redirect } from '../../actions/auth-actions';
import { connect } from 'react-redux';

class EnsureAuthentication extends Component {
  componentDidMount() {
    if (!this.props.isUserAuthenticated) {
      this.props.redirect('/login');
    }
  }

  render() {
    if (this.props.isUserAuthenticated) {
      return this.props.children;
    }
    return null;
  }
}

EnsureAuthentication.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.any,
  redirect: PropTypes.func
};

function mapStateToProps(state) {
  return {
    isUserAuthenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { redirect })(EnsureAuthentication);
