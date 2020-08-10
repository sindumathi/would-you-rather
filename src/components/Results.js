import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Badge,
} from '@material-ui/core';
import PropTypes from 'prop-types';

//Displays the users result.
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
    backgroundColor: '#ab47bc',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    fontSize: 16,
  },
  card: {
    marginBottom: 20,
    border: '1px solid #ab47bc',
    width: '100%',
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
    userAnswered,
  } = props.questions;
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant='h5' component='h2'>
        Results
      </Typography>
      <Grid container>
        <Box style={{ width: '100%' }}>
          <Badge
            color='secondary'
            style={{ width: '100%' }}
            badgeContent='Your Vote'
            invisible={userAnswered === 'optionOne' ? false : true}
          >
            <Card
              className={classes.card}
              style={
                userAnswered === 'optionOne'
                  ? { backgroundColor: '#f3e5f5' }
                  : { backgroundColor: 'none' }
              }
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='body1'
                >{`Would you rather ${optionOne.text}?`}</Typography>
                <Box display='flex' alignItems='center'>
                  <Box width='100%' mr={1}>
                    <BorderLinearProgress
                      variant='determinate'
                      value={optionOnePercentage}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                    >{`${Math.round(optionOnePercentage)}%`}</Typography>
                  </Box>
                </Box>
                <Typography
                  gutterBottom
                  variant='subtitle2'
                >{` ${optionOne.votes.length} of ${totalVotes} votes`}</Typography>
              </CardContent>
            </Card>
          </Badge>
        </Box>
        <Box style={{ width: '100%' }}>
          <Badge
            color='secondary'
            badgeContent='Your Vote'
            style={{ width: '100%' }}
            invisible={userAnswered === 'optionTwo' ? false : true}
          >
            <Card
              className={classes.card}
              style={
                userAnswered === 'optionTwo'
                  ? { backgroundColor: '#f3e5f5' }
                  : { backgroundColor: 'none' }
              }
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='body1'
                >{`Would you rather ${optionTwo.text}?`}</Typography>
                <Box display='flex' alignItems='center'>
                  <Box width='100%' mr={1}>
                    <BorderLinearProgress
                      variant='determinate'
                      value={optionTwoPercentage}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                    >{`${Math.round(optionTwoPercentage)}%`}</Typography>
                  </Box>
                </Box>
                <Typography
                  gutterBottom
                  variant='subtitle2'
                >{` ${optionTwo.votes.length} of ${totalVotes} votes`}</Typography>
              </CardContent>
            </Card>
          </Badge>
        </Box>
      </Grid>
    </div>
  );
};

//Proptypes
Results.propTypes = {
  questions: PropTypes.shape({
    optionOne: PropTypes.object.isRequired,
    optionOnePercentage: PropTypes.number.isRequired,
    optionTwo: PropTypes.object.isRequired,
    optionTwoPercentage: PropTypes.number.isRequired,
    totalVotes: PropTypes.number.isRequired,
    userAnswered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }),
};

export default Results;
