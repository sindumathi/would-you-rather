import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from './users';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
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
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      })
      .catch((e) => {
        console.warn('ERROR: Add Question');
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      });
  };
}

export function saveAnswerToQuestion({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
