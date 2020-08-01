import React from 'react';
import { connect } from 'react-redux';
import handleInitialData from '../actions/shared';
import { setAuthUser } from '../actions/authedUser';

import SignIn from './SignIn';
import Dashboard from './Dashboard';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleUserLogin = (user) => {
    this.props.dispatch(setAuthUser(user));
  };
  render() {
    const { authedUser } = this.props;
    return (
      <div>
        {authedUser ? (
          <Dashboard authedUser={authedUser} />
        ) : (
          <SignIn handleUserLogin={this.handleUserLogin} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
