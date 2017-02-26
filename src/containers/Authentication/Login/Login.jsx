import React from 'react';
import { SubmissionError } from 'redux-form';
import LoginForm from '../../../components/loginForm';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class Login extends React.Component {
  submit(values) {
    return sleep(1000) // simulate server latency
      .then(() => {
        if (![ 'john', 'paul', 'george', 'ringo@ringo.rs' ].includes(values.email)) {
          throw new SubmissionError({ email: 'EMAIL BAD', _error: 'Login failed!' });
        } else if (values.password !== 'redux-form') {
          throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' });
        } else {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
        }
      });
  }

  render() {
    return (
      <div>
        Login Page
        <LoginForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default Login;
