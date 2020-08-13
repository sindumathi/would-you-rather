import React, { Component } from 'react';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Paper, Grid, withStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const customStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 500,
    minWidth: 300,
    boxShadow: 'none',
    border: '2px solid #b39ddb',
    fontSize: 16,
  },

  heading: {
    borderBottom: '3px solid  #b39ddb',
    color: '#ab47bc',
    marginBottom: 10,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  inputBox: {
    width: '100%',
    maxWidth: '100%',
    border: '1px solid #ab47bc',
    height: '3em',
    marginBottom: 10,
  },
  buttonGrid: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#ab47bc',
    color: 'white',
    align: 'center',
    '&:hover': {
      background: '#ab47bc',
    },
  },
});
// User can create new question
// This page loads in '/add' path and go to home page(Dashboard) after adding question
// controlled component: questions are stored in state before storing it to redux store.
class AddQuestion extends Component {
  state = { question1: '', question2: '' };

  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    const { dispatch, authedUser } = this.props;

    const question = {
      optionOneText: this.state.question1,
      optionTwoText: this.state.question2,
      author: authedUser,
    };
    dispatch(handleAddQuestion(question));
  };
  render() {
    const { question1, question2 } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
            <Grid item xs={12} className={classes.heading}>
              <Typography gutterBottom variant='subtitle1'>
                Create New question
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' gutterBottom>
                Complete the question
              </Typography>
              <Typography gutterBottom variant='h5'>
                Would you rather...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                type='text'
                placeholder='EnterQuestion'
                className={classes.inputBox}
                name='question1'
                value={question1}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                OR
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                type='text'
                placeholder='EnterQuestion'
                className={classes.inputBox}
                name='question2'
                value={question2}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} className={classes.buttonGrid}>
              <Button
                variant='contained'
                className={classes.button}
                type='submit'
                component={Link}
                to='/dashboard'
                disabled={question1 === '' || question2 === ''}
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
AddQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(withStyles(customStyles)(AddQuestion));
