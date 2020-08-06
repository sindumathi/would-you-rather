import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import handleInitialData from '../actions/shared';
import { setAuthUser } from '../actions/authedUser';
import SignIn from './SignIn';
import Header from './Header';
import Dashboard from './Dashboard';
import AnswerQuestion from './AnswerQuestion';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  handleUserLogin = (user) => {
    this.props.dispatch(setAuthUser(user));
  };
  render() {
    const { authedUser } = this.props;
    console.log('authedUserrrrrrrrrrrrrrrrrrrrrrr' + authedUser);
    return (
      <Router>
        <div>
          {authedUser === null ? (
            <Route exact path='/'>
              <SignIn handleUserLogin={this.handleUserLogin} />
            </Route>
          ) : (
            <Fragment>
              <Header authedUser={authedUser} />
              <Route exact path='/dashboard'>
                <Dashboard authedUser={authedUser} />
              </Route>
              <Route exact path='/new'>
                <AddQuestion authedUser={authedUser} />
              </Route>
              <Route exact path='/leaderboard' component={LeaderBoard} />
              <Route
                exact
                path='/questions/:id'
                render={(props) => (
                  <AnswerQuestion authedUser={authedUser} {...props} />
                )}
              ></Route>
            </Fragment>
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
