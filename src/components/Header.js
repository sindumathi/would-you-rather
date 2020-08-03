import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { name, avatarURL } = props.user;
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6'>Home</Typography>
          <Typography variant='h6'>
            <Link to='/new'>New Question</Link>
          </Typography>
          <Typography variant='h6'>
            <Link to='/leaderboard'>Leader Board</Link>
          </Typography>
          <Typography variant='h6'>Hello {name}</Typography>
          <Avatar alt='Remy Sharp' src={avatarURL} className={classes.small} />
          <Typography variant='h6'>Logout</Typography>
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
export default connect(mapStateToProps)(Header);
