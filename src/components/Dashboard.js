import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Questions from './Questions';
import AnswerQuestion from './AnswerQuestion';
import Header from './Header';
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
    console.log('Inside button click----------------------' + value);
    this.setState({ answered: value });
  };

  render() {
    const {
      unansweredQuestionIDs,
      answeredQuestionIDs,
      classes,
      authedUser,
    } = this.props;
    const { answered } = this.state;
    const QuestionIDs =
      answered === 'answered' ? answeredQuestionIDs : unansweredQuestionIDs;
    console.log('answered state' + answered);
    return (
      <div className={classes.root}>
        <Header />
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
            {QuestionIDs.map((id) => (
              <ListItem key={`${id}`}>
                {' '}
                <AnswerQuestion id={id} authedUser={authedUser} />
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
  console.log('------------useranser-----------------');
  console.log(userAnswer);
  console.log(questions);
  console.log('-----------------------------');
  const answeredQuestionIDs = authedUser ? Object.keys(userAnswer) : [];
  const unansweredQuestionIDs = Object.keys(questions).filter(
    (id) => !answeredQuestionIDs.includes(id)
  );

  return {
    answeredQuestionIDs,
    unansweredQuestionIDs,
  };
};

export default connect(mapStateToProps)(withStyles(customStyles)(Dashboard));
