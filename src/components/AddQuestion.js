import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
class AddQuestion extends Component {
  state = { question1: '', question2: '' };
  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    console.log('inside submit-------------------->');
    const { dispatch, authedUser } = this.props;
    const question = {
      optionOneText: this.state.question1,
      optionTwoText: this.state.question2,
      author: authedUser,
    };
    console.log('authedUser' + authedUser);
    console.log('question' + question);
    dispatch(handleAddQuestion(question));
  };
  render() {
    const { question1, question2 } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4> Create New Question</h4>
          <small>Complete the question </small>
          <h5>Would you rather</h5>
          <input
            type='text'
            placeholder='EnterQuestion'
            name='question1'
            value={question1}
            onChange={this.handleInputChange}
          />
          <h6>OR</h6>
          <input
            type='text'
            placeholder='EnterQuestion'
            name='question2'
            value={question2}
            onChange={this.handleInputChange}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            component={Link}
            to='/dashboard'
            disabled={question1 === '' && question2 === ''}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default connect()(AddQuestion);
