import React, { Fragment } from 'react';
import { Card, withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { setAuthUser } from '../actions/authedUser';

const customStyles = (theme) => ({
  root: {
    maxWidth: 500,
    minHeight: 500,
    textAlign: 'center',
    fontSize: 16,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  content: {},
  button: {
    width: '100%',
    backgroundColor: '#ab47bc',
    align: 'center',
    '&:hover': {
      background: '#ab47bc',
    },
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  cardHeader: {
    backgroundColor: '#ab47bc',
    marginBottom: 20,
  },
  selectUser: {
    width: '100%',
    maxWidth: '100%',
    border: '1px solid #ab47bc',
    height: '3em',
    marginBottom: 40,
    backgroundColor: '#f3e5f5',
    '&:option': {
      '&:hover': {
        backgroundColor: '#ab47bc',
      },
    },
  },
});

//SignIn page
//Controlled Component stores the selected user and it is stored in redux store.
class SignIn extends React.Component {
  state = { selectedUser: '', redirectToReferrer: false };
  handleUserLogin = (user, e) => {
    e.preventDefault();
    this.props.dispatch(setAuthUser(user));
    this.setState({ redirectToReferrer: true });
  };
  handlePath = (path) => {
    return path === '/leaderboard'
      ? 'visit Leader board'
      : path === '/add'
      ? 'create New Question'
      : 'Game';
  };
  render() {
    const { users, classes } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: '/dashboard' },
    };
    const { selectedUser, redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <Fragment>
        <Grid container style={{ marginTop: 40 }}>
          <Grid
            item
            xs={12}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Typography
              style={{
                color: '#ab47bc',
                marginBottom: 40,
              }}
              variant={'h6'}
              gutterBottom
            >
              Please Signin to {this.handlePath(from.pathname)}!!!
            </Typography>
          </Grid>
          <Card className={classes.root}>
            <CardContent className={classes.cardHeader}>
              <Typography
                style={{ color: 'white' }}
                variant={'h6'}
                gutterBottom
              >
                Welcome to the Would You Rather App
              </Typography>
              <Typography
                style={{ color: 'white' }}
                variant='body2'
                gutterBottom
              >
                Please Sign in to continue
              </Typography>
            </CardContent>

            <CardMedia>
              <Avatar className={classes.avatar} src='/images/logo.jpeg' />
            </CardMedia>
            <CardContent>
              <select
                className={classes.selectUser}
                defaultValue='chooseUser'
                onChange={(e) =>
                  this.setState({ selectedUser: e.target.value })
                }
              >
                <option value='chooseUser' disabled>
                  Select User to Login
                </option>
                {users.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                style={{ color: 'white' }}
                className={classes.button}
                disabled={selectedUser === '' || selectedUser === 'chooseUser'}
                onClick={(e) => {
                  this.handleUserLogin(selectedUser, e);
                }}
              >
                Sign In
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
};

//Proptypes
SignIn.propTypes = {
  users: PropTypes.array.isRequired,
};

export default withRouter(
  connect(mapStateToProps)(withStyles(customStyles)(SignIn))
);
