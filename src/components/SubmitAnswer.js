import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Radio,
  RadioGroup,
  Button,
  FormControlLabel,
  FormControl,
  ListItemText,
  Typography,
  Container,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { handleSaveQuestionAnswer } from '../actions/users';
import Results from './Results';
import PropTypes from 'prop-types';

//Displays the questions based on users request
//Controlled component state stores selected option until it is submitted to store.
class SubmitAnswer extends Component {
  state = { selectedAnswer: 'optionOne' };

  handleAnswerChange = (event) => {
    const { value } = event.target;
    this.setState({ selectedAnswer: value });
  };
  handleAnswers = (id, authedUser, selectedAnswer) => {
    const { dispatch } = this.props;
    const info = { authedUser: authedUser, answer: selectedAnswer, qid: id };
    dispatch(handleSaveQuestionAnswer(info));
  };
  render() {
    const {
      optionOne,
      optionTwo,
      authedUser,
      id,
      userAnswered,
    } = this.props.question;
    const { comp } = this.props;
    const { selectedAnswer } = this.state;
    return (
      <Container>
        {comp && comp === 'ANSWER_COMPONENT' && !userAnswered ? (
          <Fragment>
            <Typography gutterBottom variant='h5' component='h2'>
              Would You Rather?
            </Typography>
            <FormControl>
              <RadioGroup
                name='answerQuestion'
                value={this.state.selectedAnswer}
                onChange={this.handleAnswerChange}
              >
                <FormControlLabel
                  value='optionOne'
                  control={<Radio />}
                  label={`${optionOne.text}`}
                />
                <FormControlLabel
                  value='optionTwo'
                  control={<Radio />}
                  label={`${optionTwo.text}`}
                />
              </RadioGroup>
              <Button
                variant='contained'
                style={{ backgroundColor: '#ab47bc', color: 'white' }}
                component={Link}
                to={{
                  pathname: `/questions/${id}`,
                  state: { results: 'RESULTS', id: `${id}` },
                }}
                onClick={(e) => {
                  this.handleAnswers(id, authedUser, selectedAnswer);
                }}
              >
                Submit
              </Button>
            </FormControl>
          </Fragment>
        ) : (comp && comp === 'RESULTS') ||
          (comp && comp === 'ANSWER_COMPONENT' && userAnswered) ? (
          <Results questions={this.props.question} />
        ) : (
          <Fragment>
            <Typography gutterBottom variant='h5' component='h2'>
              Would You Rather?
            </Typography>
            <ListItemText>{optionOne.text}</ListItemText>
            <ListItemText>
              <small>..OR..</small>
            </ListItemText>
            <Button
              style={{
                backgroundColor: '#ab47bc',
                color: 'white',
                textTransform: 'none',
                width: '100%',
                marginTop: 20,
              }}
              component={Link}
              to={`questions/${id}`}
            >
              View Poll
            </Button>
          </Fragment>
        )}
      </Container>
    );
  }
}

//Proptypes
SubmitAnswer.propTypes = {
  questions: PropTypes.shape({
    optionOne: PropTypes.object.isRequired,
    optionTwo: PropTypes.object.isRequired,
    authedUser: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    userAnswered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
};

export default connect()(SubmitAnswer);
