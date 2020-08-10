import { createMuiTheme } from '@material-ui/core/styles';
import { purple, deepPurple, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: deepPurple[300],
    },
    info: {
      main: purple[400],
    },
    fontSize: 16,
  },
});

export default theme;
