import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import red from 'material-ui/colors/red';
import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import PersistentDrawer from './naviBar';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: red,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    const { classes } = props;
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <PersistentDrawer />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}



export default withRoot;
