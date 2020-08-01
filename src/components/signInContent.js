import React from 'react';

const signInContent = () => {
  return (
    <select
      value={book.shelf || 'none'}
      onChange={(e) => {
        updateBookShelf(book, e.target.value);
      }}
    >
      <option value='chooseUser' disabled>
        Select User to Login
      </option>
      <option value={user.id}>{user.name}</option>
    </select>
  );
};

export default signInContent;

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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

export default function CustomizedProgressBars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant='determinate' value={10} />
    </div>
  );
}

/*shoe question*/
<List className={classes.list}>
  {QuestionIDs.map((id) => (
    <ListItem key={`${id}`}>
      <Questions id={id} authedUser />
    </ListItem>
  ))}
</List>;
