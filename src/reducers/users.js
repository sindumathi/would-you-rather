import { GET_USERS } from '../actions/users';
import { SAVE_ANSWER } from '../actions/questions';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_ANSWER: {
      const { answer, qid, authedUser } = action;
      const userAnswer = { [qid]: `${answer}` };
      return {
        ...state,
        [action.authedUser]: {
          ...state[authedUser],
          answers: { ...state[authedUser].answers, ...userAnswer },
        },
      };
    }
    default:
      return state;
  }
}
