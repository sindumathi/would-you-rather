import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    minHeight: 500,
    textAlign: 'center',
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
    },
  },
  content: {},
  button: {
    width: '90%',
    align: 'center',
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: 10,
    },
  },
});

const SignIn = (props) => {
  const [selectedUser, setSelectedUser] = useState('');
  console.log('selectedUser' + selectedUser);
  const classes = useStyles();
  const { users, handleUserLogin } = props;
  return (
    <Fragment>
      <Grid container style={{ marginTop: 40 }}>
        <Grid item xs={1} sm={2} md={3} lg={4} xl={4} />
        <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
          <Card className={classes.root}>
            <CardContent className={classes.content}>
              <Typography
                className={'MuiTypography--heading'}
                variant={'h6'}
                gutterBottom
              >
                Welcome to the Would You Rather App
              </Typography>
              <Typography>Please Sign in to continue</Typography>
              <Divider />
            </CardContent>
            <CardMedia>
              {users.map((user) => (
                <Avatar
                  className={classes.avatar}
                  key={user.id}
                  src={user.avatarURL}
                />
              ))}
            </CardMedia>
            <CardContent>
              <select
                defaultValue='chooseUser'
                onChange={(e) => setSelectedUser(e.target.value)}
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
                color='primary'
                className={classes.button}
                onClick={(e) => {
                  e.preventDefault();
                  handleUserLogin(selectedUser);
                }}
              >
                Sign In
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};
const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users),
  };
};
export default connect(mapStateToProps)(SignIn);
