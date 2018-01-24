import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui-icons/Menu';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import DashboardIcon from 'material-ui-icons/Dashboard';
import MapIcon from 'material-ui-icons/Map';
import ExitIcon from 'material-ui-icons/ExitToApp';
import DoneIcon from 'material-ui-icons/DoneAll';
import CompareIcon from 'material-ui-icons/CompareArrows';
import LanguageIcon from 'material-ui-icons/Language';
import Dashboard from './pages/dashboard';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_cn_navi';
import en_US from './locale/en_us_navi';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import routes from './routes/routes';

addLocaleData([...en,...zh]);

const styles = {
    list: {
      width: 250,
    },
    loginButton: {
      float: 'right',
    },
    link: {
      textDecoration: 'none',
    },
  };

class PersistentDrawer extends React.Component {
  static isPrivate = true;

  state = {
    open: false,
    locale: "en",
    messages: en_US
  };

  handleLogout = () => (e) => {
    localStorage.clear();
    window.location = '/login';
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  switchLang = () => (e) => {
    if (this.state.locale==="en") {
      this.setState({locale: "zh", messages: zh_CN});
    } else {
      this.setState({locale: "en", messages: en_US});
    }
  };

  render() {
    const { classes } = this.props;
    const { open, content, locale, messages } = this.state;

    const drawer = (
      <IntlProvider locale={locale} messages={messages}>
      <Drawer anchor='left' open={open} onClick={this.handleDrawerClose}>
            <IconButton><ChevronLeft /></IconButton>
          <Divider />
          <div className={classes.list}>
          <List>
            <Link to="/dashboard" className={classes.link}><ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="dashboard" />} />
            </ListItem></Link>
          <Divider />
            <ListItem button>
              <ListItemIcon><ExitIcon /></ListItemIcon>
              <ListItemText primary="Logout"  onClick={this.handleLogout()}/>
            </ListItem>
          </List></div>
      </Drawer>
      </IntlProvider>
    );

    let before = null;
    before = drawer;

    return (
        <div className={classes.appFrame}>
        <Router>
        <div>
        <IntlProvider locale={locale} messages={messages}>
          <AppBar position="static">
            <Toolbar disableGutters={!open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {<FormattedMessage id='title' />}
              </Typography>
            </Toolbar>
          </AppBar>
        </IntlProvider>
        {before}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
        </div>
        </Router>
        </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);