import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import handleInitialData from '../actions/shared';
import SignIn from './SignIn';
import Header from './Header';
import Dashboard from './Dashboard';
import AnswerQuestion from './AnswerQuestion';
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import PageNotFound from './PageNotFound';
import PrivateRoute from './PrivateRoute';
import urlNotFound from './urlNotFound';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <div>
          <Fragment>
            <Header authedUser={authedUser} />
            <Switch>
              <PrivateRoute path='/leaderboard' exact component={LeaderBoard} />
              <Route exact path='/' component={SignIn} />
              <PrivateRoute path='/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/add' exact component={AddQuestion} />
              <PrivateRoute
                exact
                path='/questions/:id'
                component={AnswerQuestion}
                render={(props) => ({ ...props })}
              />
              <Route path='/PageNotFound' component={PageNotFound} />
              <Route component={urlNotFound} />
            </Switch>
          </Fragment>
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
