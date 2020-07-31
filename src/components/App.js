import React from 'react';
import { connect } from 'react-redux';
import handleInitialData from '../actions/shared';

/*import SignIn from './SignIn'; */
import Dashboard from './Dashboard';

class App extends React.Component {
  state = { authUser: '' };

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  userLogin = (user) => {
    this.setState({ authUser: user });
  };
  render() {
    return (
      <div>
        {/*<SignIn userLogin={this.userLogin} />   */}
        <Dashboard />
      </div>
    );
  }
}

export default connect()(App);
