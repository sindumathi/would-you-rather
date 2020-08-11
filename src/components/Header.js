import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../actions/authedUser';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontSize: 16,
  },
  appbar: {
    backgroundColor: '#9575cd',
    marginBottom: 30,
  },
  button: {
    marginRight: theme.spacing(2),
    textTransform: 'none',
    fontSize: 16,
    color: 'white',
  },
  authUserName: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
}));

//Navigation tabs, Switches between tabs and highlights selected tab.
const Header = (props) => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { name, avatarURL } = props.user;
  const path = ['/dashboard', '/add', '/leaderboard'];
  const { pathname } = props.history.location;
  function handleLogout(e) {
    e.preventDefault();
    props.logout();
    props.history.push('/');
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.history.push(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar variant='dense'>
          <Tabs
            value={pathname.includes(path) ? pathname : '/dashboard'}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            <Tab
              label='Home'
              color='inherit'
              className={classes.button}
              value='/dashboard'
              component={Link}
              to='/dashboard'
            />
            <Tab
              label='New Question'
              color='inherit'
              className={classes.button}
              value='/add'
              component={Link}
              to='/add'
            />
            <Tab
              label='LeaderBoard '
              color='inherit'
              className={classes.button}
              value='/leaderboard'
              component={Link}
              to='/leaderboard'
            />
          </Tabs>
          <Typography style={{ flex: 1 }}></Typography>
          <Typography className={classes.authUserName}>Hello {name}</Typography>
          <Avatar alt='Remy Sharp' src={avatarURL} className={classes.small} />
          <Button
            color='inherit'
            className={classes.button}
            onClick={handleLogout}
          >
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

//Proptypes
Header.propTypes = {
  authedUser: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarURL: PropTypes.string.isRequired,
  }),
};

export default withRouter(connect(mapStateToProps, { logout })(Header));
