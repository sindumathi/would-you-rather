import React, { Component, Fragment } from 'react';
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

class Dashboard extends Component {
  state = { answered: 'Unanswered' };
  handleQuestionsDisplay = (e, value) => {
    e.preventDefault();
    this.setState({ answered: value });
  };

  render() {
    const { unansweredQuestionIDs, answeredQuestionIDs, classes } = this.props;
    const { answered } = this.state;
    const QuestionIDs =
      answered === 'answered' ? answeredQuestionIDs : unansweredQuestionIDs;
    return (
      <Paper className={classes.card}>
        <Grid
          xs={12}
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={6} className={classes.cardItem}>
            <Button
              size='small'
              style={{ color: 'white' }}
              onClick={(e) => this.handleQuestionsDisplay(e, 'Unanswered')}
            >
              Unanswered
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.cardItem}>
            <Button
              size='small'
              style={{ color: 'white' }}
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
    .sort((x, y) => y.timestamp - x.timestamp);
  return {
    answeredQuestionIDs,
    unansweredQuestionIDs,
  };
};

export default connect(mapStateToProps)(withStyles(customStyles)(Dashboard));
