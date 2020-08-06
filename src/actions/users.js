import { saveQuestionAnswer } from '../utils/api';
import { saveAnswerToQuestion } from './questions';
export const GET_USERS = 'GET_USERS';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

function saveAnswerToUser({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    return saveQuestionAnswer(info)
      .then((info) => {
        dispatch(saveAnswerToUser(info));
        dispatch(saveAnswerToQuestion(info));
      })
      .catch((e) => {
        console.warn('ERROR:Save Answer-', e);
        dispatch(saveAnswerToUser(info));
        dispatch(saveAnswerToQuestion(info));
      });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}
