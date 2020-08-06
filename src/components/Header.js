import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/authedUser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: '#9c27b0',
    marginBottom: 30,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { name, avatarURL } = props.user;
  function handleLogout(e) {
    e.preventDefault();
    props.logout();
    props.history.push('/');
  }
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar variant='dense'>
          <Button
            color='inherit'
            className='classes.button'
            component={Link}
            to='/dashboard'
          >
            Home
          </Button>
          <Button
            color='inherit'
            className='classes.button'
            component={Link}
            to='/new'
          >
            New Question
          </Button>
          <Button
            color='inherit'
            className='classes.button'
            component={Link}
            to='/leaderboard'
          >
            Leader Board
          </Button>
          <Typography style={{ flex: 1 }}></Typography>
          <Typography variant='h6'>Hello {name}</Typography>
          <Avatar alt='Remy Sharp' src={avatarURL} className={classes.small} />
          <Button color='inherit' onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = ({ users }, { authedUser }) => {
  const user = users[authedUser];
  return {
    user,
  };
};
export default withRouter(connect(mapStateToProps, { logout })(Header));
