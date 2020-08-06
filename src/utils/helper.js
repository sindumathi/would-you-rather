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
  const userAnswered = ((optionOne, optionTwo, authedUser) => {
    return optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser)
      ? true
      : false;
  })(optionOne, optionTwo, authedUser);
  return {
    optionOne,
    optionOnePercentage,
    optionTwo,
    optionTwoPercentage,
    totalVotes,
    author,
    authedUser,
    userAnswered,
    id,
  };
}

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatAddQuestion({ optionOneText, optionTwoText, author }) {
  console.log(
    'optionOneText' +
      optionOneText +
      'optionTwoText' +
      optionTwoText +
      'author' +
      author
  );
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}
