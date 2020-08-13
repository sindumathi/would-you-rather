import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, userAuthenticated, ...rest }) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        userAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ authedUser }) => ({
  userAuthenticated: authedUser !== null,
});

//Proptypes
PrivateRoute.propTypes = {
  userAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
export default withRouter(connect(mapStateToProps)(PrivateRoute));
