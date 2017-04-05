import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { redirect } from '../../../actions/auth-actions';

class ResetPassword extends Component {
  componentWillMount() {
    const resetPasswordToken = this.props.params.token;
    if (!resetPasswordToken ) {
      this.props.redirect('/');
    }

  }

  render() {
    return (
      <div>
        dsadsadsa
      </div>
    );
  }
}

ResetPassword.propTypes = {
  userResetEmail: PropTypes.string,
  redirect: PropTypes.func,
  params: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    userResetEmail: state.auth.ResetPassword,
  };
};

export default connect(mapStateToProps, { redirect })(ResetPassword);
