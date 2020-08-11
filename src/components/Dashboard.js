import React, { Component } from 'react';
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
class Dashboard extends Component {
  state = {
    answered: 'unanswered',
    answeredColor: 'button',
    unAnsweredColor: 'buttonActive',
  };
  handleQuestionsDisplay = (e, value) => {
    e.preventDefault();
    this.setState({ answered: value });
    value === 'answered'
      ? this.setState({
          answeredColor: 'buttonActive',
          unAnsweredColor: 'button',
        })
      : this.setState({
          answeredColor: 'button',
          unAnsweredColor: 'buttonActive',
        });
  };

  render() {
    const { unansweredQuestionIDs, answeredSortedIDs, classes } = this.props;
    const { answered } = this.state;
    const QuestionIDs =
      answered === 'answered' ? answeredSortedIDs : unansweredQuestionIDs;
    return (
      <Paper className={classes.card}>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item xs={6} className={classes.cardItem}>
            <Button
              id='unanswered'
              className={
                this.state.unAnsweredColor === 'buttonActive'
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={(e) => this.handleQuestionsDisplay(e, 'unanswered')}
            >
              Unanswered
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.cardItem}>
            <Button
              id='answered'
              className={
                this.state.answeredColor === 'buttonActive'
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={(e) => this.handleQuestionsDisplay(e, 'answered')}
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
                    <Questions id={id} authedUser />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

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
