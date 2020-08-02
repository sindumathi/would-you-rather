export function formatQuestion(authedUser, question, user) {
  const { id, author, optionOne, optionTwo } = question;
  const { name, avatarURL } = user;
  return {
    id,
    author,
    optionOne,
    optionTwo,
    name,
    avatarURL,
    authedUser,
  };
}

function findPercentage(value, totalValue) {
  const result = (value / totalValue) * 100;
  return result;
}

export function formattedResult(authedUser, question) {
  const { id, author, optionOne, optionTwo } = question;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const optionOnePercentage = findPercentage(
    optionOne.votes.length,
    totalVotes
  );
  const optionTwoPercentage = findPercentage(
    optionTwo.votes.length,
    totalVotes
  );
  return {
    optionOne,
    optionOnePercentage,
    optionTwo,
    optionTwoPercentage,
    totalVotes,
    author,
    authedUser,
    id,
  };
}
