import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Avatar,
  Paper,
  withStyles,
  ListItemAvatar,
} from '@material-ui/core';
class LeaderBoard extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        {users.map((user) => (
          <Paper>
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

export default connect(mapStatetoProps)(withStyles()(LeaderBoard));
