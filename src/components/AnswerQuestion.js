import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
class AnswerQuestion extends Component {
  render() {
    const qid = this.props.match.params.id || this.props.location.state.id;
    const { authedUser } = this.props;
    const results =
      this.props.location && this.props.location.state
        ? this.props.location.state.results
        : '';
    const ANSWER = results || 'ANSWER_COMPONENT';
    return (
      <div>
        <Questions id={qid} comp={ANSWER} authedUser={authedUser} />
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser }, { qid }) => {
  return {
    authedUser,
    qid,
  };
};
export default connect(mapStateToProps)(AnswerQuestion);
