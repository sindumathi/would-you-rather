import { saveQuestionAnswer } from '../utils/api';
import { saveQuestion } from '../utils/api';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function saveAnswer({ authedUser, qid, answer }) {
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

function addQuestion(question) {
  console.log('------------action addquestion---------------');
  console.log(question);
  console.log('------------action addquestion---------------');
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question) {
  console.log('------------handleaddquestion---------------');
  console.log(question);
  console.log('------------handleaddquestion---------------');
  return (dispatch) => {
    return saveQuestion(question)
      .then((info) => dispatch(addQuestion(question)))
      .catch((e) => {
        console.warn('ERROR: Add Question');
        dispatch(addQuestion(question));
      });
  };
}
