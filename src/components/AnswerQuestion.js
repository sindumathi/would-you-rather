import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAnswered } from '../utils/helper';

//Answer Poll functionality
class AnswerQuestion extends Component {
  render() {
    const { qid, authedUser, ANSWER, redirectToPageNotFound } = this.props;

    if (redirectToPageNotFound) {
      return <Redirect to='/PageNotFound' />;
    }

    return (
      <div>
        <Questions id={qid} comp={ANSWER} authedUser={authedUser} />
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser, questions }, ownProps) => {
  const { history } = ownProps;
  const qid = ownProps.match.params.id || ownProps.location.state.id;
  const question = questions[qid] || null;
  const userAnswer = question ? userAnswered(authedUser, question) : false;

  const results =
    ownProps.location && ownProps.location.state
      ? ownProps.location.state.results
      : '';
  const ANSWER = results || 'ANSWER_COMPONENT';
  const userRedirect =
    ANSWER === 'ANSWER_COMPONENT' &&
    history.action === 'REPLACE' &&
    !userAnswer;

  const redirectToPageNotFound = question === null || userRedirect;

  return {
    authedUser,
    qid,
    ANSWER,
    redirectToPageNotFound,
  };
};

AnswerQuestion.propTypes = {
  authedUser: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(AnswerQuestion);
