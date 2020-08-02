import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import handleInitialData from '../actions/shared';
import { setAuthUser } from '../actions/authedUser';

import SignIn from './SignIn';
import Dashboard from './Dashboard';
import AnswerQuestion from './AnswerQuestion';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleUserLogin = (user) => {
    this.props.dispatch(setAuthUser(user));
  };
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div>
          {authedUser ? (
            <Fragment>
              <Route exact path='/dashboard'>
                <Dashboard authedUser={authedUser} />
              </Route>
              <Route
                exact
                path='/questions/:id'
                render={(props) => (
                  <AnswerQuestion authedUser={authedUser} {...props} />
                )}
              ></Route>
            </Fragment>
          ) : (
            <Route exact path='/'>
              <SignIn handleUserLogin={this.handleUserLogin} />
            </Route>
          )}
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
