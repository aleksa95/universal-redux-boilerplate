import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../../../components/loginForm';
import { signUpUser } from '../../../actions/auth-actions';

class SignUp extends React.Component {
  submit(values) {
    return this.props.signUpUser(values);
  }

  render() {
    const styles = require('../_authentication.scss');

    return (
      <div className={styles['authentication-wrapper']}>
        <div className={styles['authentication-title']}>Sign Up Page</div>
        <SignUpForm onSubmit={this.submit.bind(this)} />
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpUser: React.PropTypes.func,
};

export default connect(null, { signUpUser })(SignUp);
