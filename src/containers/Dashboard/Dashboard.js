/* eslint react/prefer-stateless-function: 0 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const DStyles = require('./dashboard.scss');

class Dashboard extends Component {
  render() {
    return (
      <div className={DStyles['dashboard-wrapper']}>
        <h3>LOGGED INTO DASHBOARD</h3>
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
