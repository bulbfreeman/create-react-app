import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import red from 'material-ui/colors/red';
import Reboot from 'material-ui/Reboot';


const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
  typography: {
    fontFamily: 'ibm'+'sans-serif',
  },
  palette: {
    contrastThreshold: 3.1,
    tonalOffset: 0.07,
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
      contrastText: defaultTheme.palette.getContrastText(blueGrey[500]),
    },
    secondary: {
      light: red.A200,
      main: red.A400,
      dark: red.A700,
      contrastText: defaultTheme.palette.getContrastText(red.A400),
    },
    error: red.A400,
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}



export default withRoot;
