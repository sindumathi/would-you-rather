import React from 'react';
import { connect } from 'react-redux';
const Dashboard = (props) => {
  console.log(props);
  return <div>Dashboard</div>;
};

const mapStateToProps = ({ users, questions }) => {
  return {
    users,
    questions,
  };
};

export default connect(mapStateToProps)(Dashboard);
