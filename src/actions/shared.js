import { getInitialData } from '../utils/api';
import { getUsers } from './users';
import { getQuestions } from './questions';

export default function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
}
