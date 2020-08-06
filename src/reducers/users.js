import { GET_USERS } from '../actions/users';
import { ADD_QUESTION_TO_USER, SAVE_ANSWER_TO_USER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SAVE_ANSWER_TO_USER: {
      const { authedUser, answer, qid } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: { ...state[authedUser].answers, [qid]: answer },
        },
      };
    }
    case ADD_QUESTION_TO_USER: {
      const { id, author } = action;

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat(id),
        },
      };
    }

    default:
      return state;
  }
}
