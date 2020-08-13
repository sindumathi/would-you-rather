import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import Divider from '@material-ui/core/Divider';

import {
  List,
  ListItem,
  withStyles,
  Paper,
  Button,
  Grid,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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
    fontSize: 16,
  },

  cardItem: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',

    border: '1px solid white',
  },
  button: {
    color: '#ab47bc',
    width: '100%',
    height: '100%',
    textTransform: 'none',
    fontSize: 16,
    backgroundColor: '#f3e5f5',
    '&:hover': {
      backgroundColor: ' #b39ddb',
    },
  },
  buttonActive: {
    color: 'white',
    width: '100%',
    height: '100%',
    textTransform: 'none',
    fontSize: 16,
    backgroundColor: '#ab47bc',
    '&:hover': {
      backgroundColor: '#ab47bc',
    },
  },
});

//Dashboard: This contains Unanswered and answered Tab
//Displays the questions in desending order
const Dashboard = (props) => {
  const [answered, setAnswered] = useState('unanswered');
  const [answeredColor, setAnsweredColor] = useState('button');
  const [unAnsweredColor, setUnAnsweredColor] = useState('buttonActive');
  const { unansweredQuestionIDs, answeredSortedIDs, classes } = props;
  const QuestionIDs =
    answered === 'answered' ? answeredSortedIDs : unansweredQuestionIDs;
  function handleQuestionsDisplay(e, value) {
    e.preventDefault();
    setAnswered(value);
    if (value === 'answered') {
      setAnsweredColor('buttonActive');
      setUnAnsweredColor('button');
    } else {
      setAnsweredColor('button');
      setUnAnsweredColor('buttonActive');
    }
  }

  return (
    <Fragment>
      <Paper className={classes.card}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={6} className={classes.cardItem}>
            <Button
              id='unanswered'
              className={
                unAnsweredColor === 'buttonActive'
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={(e) => handleQuestionsDisplay(e, 'unanswered')}
            >
              Unanswered
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.cardItem}>
            <Button
              id='answered'
              className={
                answeredColor === 'buttonActive'
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={(e) => handleQuestionsDisplay(e, 'answered')}
            >
              Answered
            </Button>
          </Grid>

          <Divider />
          <Grid item xs={12}>
            <List className={classes.list}>
              {QuestionIDs &&
                QuestionIDs.map((id) => (
                  <ListItem key={`${id}`}>
                    <Questions id={id} authedUser answered={answered} />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const userAnswer = users[authedUser].answers;
  const answeredQuestionIDs = authedUser ? Object.keys(userAnswer) : [];
  const unansweredQuestionIDs = Object.keys(questions)
    .filter((id) => !answeredQuestionIDs.includes(id))
    .sort((x, y) => questions[y].timestamp - questions[x].timestamp);

  const answeredSortedIDs = Object.keys(questions)
    .filter((id) => answeredQuestionIDs.includes(id))
    .sort((x, y) => questions[y].timestamp - questions[x].timestamp);

  return {
    answeredSortedIDs,
    unansweredQuestionIDs,
    authedUser,
  };
};

//Proptypes
Dashboard.propTypes = {
  authedUser: PropTypes.string.isRequired,
  unansweredQuestionIDs: PropTypes.array.isRequired,
  answeredSortedIDs: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(customStyles)(Dashboard));
