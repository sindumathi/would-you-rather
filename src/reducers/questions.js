import { GET_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...questions,
        ...action.questions,
      };
    default:
      return state;
  }
}
