import { saveQuestionAnswer } from '../utils/api';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function saveAnswer({ authedUser, qid, answer }) {
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&');
  console.log('answer' + answer + 'qid' + qid + 'answer' + answer);
  console.log('&&&&&&&&&&&&&&&&&&&&&&&&');
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveAnswer(info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((info) => dispatch(saveAnswer(info)))
      .catch((e) => {
        console.warn('ERROR:Save Answer-', e);
        dispatch(saveAnswer(info));
      });
  };
}
