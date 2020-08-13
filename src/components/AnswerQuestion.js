import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAnswered } from '../utils/helper';

//Answer Poll functionality
/*Page Refresh Functionality
1.Unanswered Question:
 a.New question added - When you refresh in poll page or results page redirects to login and then to 404 gave a link to dashboard since user is already logged in.
 b. Existing Question- When you refresh in poll page   redirects to login and displays the poll page but when you refresh in result page data is not saved in db. So, redirects to login page and then to 404 page.
 2. Answered Question:
 a.Existing question: redirected to the Login and then results page.
 b. New question: redirected to login and then 404 page*/

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
    ANSWER === 'RESULTS' && history.action === 'REPLACE' && !userAnswer;
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
