import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';

import { handleSaveAnswer } from '../actions/questions';
import { ListItemText, Button, Typography } from '@material-ui/core';
import Results from './Results';

class SubmitAnswer extends Component {
  state = { selectedAnswer: 'optionOne' };

  handleAnswerChange = (event) => {
    const { value } = event.target;
    this.setState({ selectedAnswer: value });
  };
  handleAnswers = (id, authedUser, selectedAnswer) => {
    const { dispatch } = this.props;
    dispatch(
      handleSaveAnswer({
        authedUser,
        answer: selectedAnswer,
        qid: id,
      })
    );
  };
  render() {
    const { optionOne, optionTwo, authedUser, id } = this.props.question;
    const { comp } = this.props;
    const { selectedAnswer } = this.state;
    return (
      <Fragment>
        {comp && comp === 'ANSWER_COMPONENT' ? (
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
                color='primary'
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
        ) : comp && comp === 'RESULTS' ? (
          <Results questions={this.props.question} />
        ) : (
          <Fragment>
            <Typography gutterBottom variant='h5' component='h2'>
              Would You Rather?
            </Typography>
            <ListItemText>{optionOne.text}</ListItemText>
            <ListItemText>{optionTwo.text}</ListItemText>
            <Link to={`questions/${id}`}>View Poll</Link>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
export default connect()(SubmitAnswer);
