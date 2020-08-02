import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { formatQuestion } from '../utils/helper';
import { handleSaveAnswer } from '../actions/questions';
class AnswerQuestion extends Component {
  state = { selectedAnswer: 'optionOne' };

  handleAnswerChange = (event) => {
    const { value } = event.target;
    this.setState({ selectedAnswer: value });
  };
  handleAnswers = (e) => {
    e.preventDefault();
    const { dispatch, id, authedUser } = this.props;
    dispatch(
      handleSaveAnswer({
        authedUser,
        answer: this.state.selectedAnswer,
        qid: id,
      })
    );
  };
  render() {
    const { optionOne, optionTwo } = this.props.question;
    const { id, authedUser } = this.props;
    const { selectedAnswer } = this.state;
    return (
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
        <button onClick={this.handleAnswers}>Submit</button>
      </FormControl>
    );
  }
}
const mapStateToProps = ({ users, questions, authedUser }, { id }) => {
  const question = questions[id];
  return {
    question: formatQuestion(authedUser, question, users[question.author]),
  };
};

export default connect(mapStateToProps)(AnswerQuestion);
