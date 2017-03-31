/* eslint react/prefer-stateless-function: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        LOGGED INTO DASHBOARD
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
