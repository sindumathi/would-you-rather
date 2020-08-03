import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';

import {
  List,
  ListItem,
  withStyles,
  Card,
  CardActions,
  Button,
} from '@material-ui/core';

const customStyles = (theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    color: '#37474f',
  },
  card: {
    margin: 'auto',
    maxwidth: 600,
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
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={(e) => this.handleQuestionsDisplay(e, 'Unanswered')}
            >
              Unanswered
            </Button>
            <Button
              size='small'
              color='primary'
              onClick={(e) => this.handleQuestionsDisplay(e, 'answered')}
            >
              Answered
            </Button>
          </CardActions>
          <List className={classes.list}>
            {QuestionIDs &&
              QuestionIDs.map((id) => (
                <ListItem key={`${id}`}>
                  <Questions id={id} authedUser />
                </ListItem>
              ))}
          </List>
          ;
        </Card>
      </div>
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
