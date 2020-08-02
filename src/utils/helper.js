export function formatQuestion(authedUser, question, user) {
  const { id, author, optionOne, optionTwo, votes } = question;
  const { name, avatarURL, answers } = user;
  return {
    id,
    author,
    optionOne,
    optionTwo,
    votes: votes,
    name,
    avatarURL,
    answers,
  };
}
