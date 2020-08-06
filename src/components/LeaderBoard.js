import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Avatar,
  Paper,
  withStyles,
  ListItemAvatar,
} from '@material-ui/core';
const customStyles = (theme) => ({
  root: {
    flexGrow: 1,
    width: 'auto',
    color: '#37474f',
  },
  card: {
    margin: 'auto',
    width: 600,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  cardItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ab47bc',
    border: '1px solid white',
  },
});
class LeaderBoard extends Component {
  render() {
    const { users, classes } = this.props;
    return (
      <div>
        {users.map((user) => (
          <Paper className={classes.card}>
            <Grid container spacing={2}>
              <Grid item>
                <ListItemAvatar>
                  <Avatar alt='Remy Sharp' src={user.avatarURL} />
                </ListItemAvatar>
              </Grid>
              <Grid item>
                <h5>{user.name}</h5>
                <small>{`Answered questions: ${
                  Object.keys(user.answers).length
                }`}</small>
                <small> {`Created questions: ${user.questions.length}`}</small>
              </Grid>

              <Grid item>
                <grid item>Score</grid>
                <grid item>
                  {Object.keys(user.answers).length + user.questions.length}
                </grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    );
  }
}
const mapStatetoProps = ({ users }) => {
  const totalScore = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => totalScore(b) - totalScore(a)),
  };
};

export default connect(mapStatetoProps)(withStyles(customStyles)(LeaderBoard));
