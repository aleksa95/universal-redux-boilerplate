import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../../components/loginForm';
import { loginUser } from '../../../actions/auth-actions';
import PropTypes from 'prop-types';

class Login extends React.Component {
  submit(values) {
    return this.props.loginUser(values);
  }

  render() {
    const styles = require('../_authentication.scss');

    return (
      <div className={styles['authentication-wrapper']}>
        <div className={styles['authentication-title']}>Login</div>
        <LoginForm onSubmit={this.submit.bind(this)} />
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, { loginUser })(Login);
