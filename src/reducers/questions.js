import { GET_QUESTIONS, SAVE_ANSWER, ADD_QUESTION } from '../actions/questions';
import { formatAddQuestion } from '../utils/helper';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_ANSWER:
      const { answer, qid, authedUser } = action;
      return {
        ...state,
        [action.qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    case ADD_QUESTION:
      const formattedQuestion = formatAddQuestion(action.question);
      return {
        ...state,
        [formattedQuestion.id]: formattedQuestion,
      };
    default:
      return state;
  }
}
