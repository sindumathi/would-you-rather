import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Avatar,
  Paper,
  withStyles,
  ListItemAvatar,
  Card,
  Typography,
  Badge,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const customStyles = (theme) => ({
  root: {
    fontSize: 16,
  },
  card: {
    margin: 'auto',
    width: 500,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 10,
    width: '100%',
    boxShadow: 'none',
    border: '2px solid #b39ddb',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    borderRight: '1px solid #d1c4e9',
    padding: '0.5em',
    alignItems: 'center',
    display: 'flex',
  },
  gridContent: {
    justifyContent: 'center',
    display: 'flex',
  },
  score: {
    boxShadow: 'none',
    border: '2px solid #b39ddb',
  },
  scoreGrid: {
    background: '#9575cd',
    color: 'white',
    justifyContent: 'center',
    display: 'flex',
    padding: 20,
  },
  alignCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  scoreHeight: {
    alignItems: 'center',
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
  },
  questionContent: {
    borderRight: '1px solid #d1c4e9',
  },

  innerTriangle: {
    borderLeft: '35px solid #e0e0e0',
    borderBottom: '35px solid transparent',
    height: 0,
    width: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
  },
  trophy: {
    position: 'absolute',
    top: 3,
    right: 20,
  },
});

//Displays Top three users who have more points
class LeaderBoard extends Component {
  render() {
    const { users, classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.card}>
          <Grid container>
            {users.map((user) => (
              <Paper className={classes.paper} spacing={2} key={user.id}>
                <div className={classes.innerTriangle}>
                  <img
                    className={classes.trophy}
                    src='/images/award.png'
                    alt='trophy'
                  />
                </div>
                <Grid container spacing={1}>
                  <Grid item xs={2} className={classes.avatar}>
                    <ListItemAvatar>
                      <Avatar alt='Remy Sharp' src={user.avatarURL} />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item xs={7} className={classes.questionContent}>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {user.name}
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                      <Grid
                        container
                        direction='row'
                        className={classes.gridContent}
                      >
                        <Grid container style={{ marginBottom: 10 }}>
                          <Grid item xs={6}>
                            {`Answered questions`}
                          </Grid>
                          <Grid item xs={6} className={classes.alignCenter}>
                            {` ${Object.keys(user.answers).length}`}
                          </Grid>
                        </Grid>
                        <Grid container style={{ marginBottom: 10 }}>
                          <Grid item xs={6}>
                            {`Created questions`}
                          </Grid>
                          <Grid item xs={6} className={classes.alignCenter}>
                            {user.questions.length}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Card className={classes.score}>
                      <Grid item xs={12} className={classes.scoreGrid}>
                        Score
                      </Grid>
                      <Grid item xs={12} className={classes.scoreHeight}>
                        <Badge
                          color='secondary'
                          badgeContent={
                            Object.keys(user.answers).length +
                            user.questions.length
                          }
                        />
                      </Grid>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </Paper>
      </Fragment>
    );
  }
}
const mapStatetoProps = ({ users }) => {
  const totalScore = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users)
      .sort((a, b) => totalScore(b) - totalScore(a))
      .splice(0, 3),
  };
};

//Proptypes
LeaderBoard.propTypes = {
  users: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStatetoProps)(withStyles(customStyles)(LeaderBoard));
