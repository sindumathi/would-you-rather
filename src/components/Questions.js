import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helper';
import { formattedResult } from '../utils/helper';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, ListItemAvatar, Avatar } from '@material-ui/core';
import SubmitAnswer from './SubmitAnswer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
    minWidth: 300,
  },
  authorHeading: {
    backgroundColor: '#b39ddb',
  },
  avatar: {
    borderRight: '0.1em solid #d1c4e9',
    padding: '0.5em',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Questions = ({ question, answerQuestion, comp = '', results = '' }) => {
  const { avatarURL, author } = question;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.authorHeading}>
            {`${author} asks`}
          </Grid>
          <Grid item xs={3} className={classes.avatar}>
            <ListItemAvatar>
              <Avatar
                alt='Remy Sharp'
                src={avatarURL}
                className={classes.large}
              />
            </ListItemAvatar>
          </Grid>
          <Grid item xs={9}>
            <SubmitAnswer question={answerQuestion} comp={comp} />
          </Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

const mapStateToProps = ({ users, questions, authedUser }, { id }) => {
  const question = questions[id];
  return {
    question: formatQuestion(authedUser, question, users[question.author]),
    answerQuestion: formattedResult(authedUser, question),
  };
};

export default connect(mapStateToProps)(Questions);
