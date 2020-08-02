import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Card, CardContent, Typography } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 25,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
const Results = (props) => {
  const classes = useStyles();
  const {
    optionOne,
    optionOnePercentage,
    optionTwo,
    optionTwoPercentage,
    totalVotes,
  } = props.questions;
  return (
    <div>
      <Typography gutterBottom variant='h5' component='h2'>
        Results
      </Typography>
      <Card>
        <CardContent>
          <h5>{`Would you rather ${optionOne.text}?`}</h5>
          <BorderLinearProgress
            variant='determinate'
            value={optionOnePercentage}
          />
          <small>{` ${optionOne.votes.length} of ${totalVotes} votes`}</small>
        </CardContent>
      </Card>
      <Card>
        <h6>{`Would you rather ${optionTwo.text}?`}</h6>
        <BorderLinearProgress
          variant='determinate'
          value={optionTwoPercentage}
        />
        <small>{` ${optionTwo.votes.length} of ${totalVotes} votes`}</small>
      </Card>
    </div>
  );
};
export default Results;
