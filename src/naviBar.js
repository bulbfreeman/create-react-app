import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui-icons/Menu';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Inbox from 'material-ui-icons/Inbox';
import Drafts from 'material-ui-icons/Drafts';
import DashboardIcon from 'material-ui-icons/Dashboard';
import MapIcon from 'material-ui-icons/Map';
import PersonIcon from 'material-ui-icons/AccountBox';
import DoneIcon from 'material-ui-icons/DoneAll';
import CompareIcon from 'material-ui-icons/CompareArrows';
import LanguageIcon from 'material-ui-icons/Language';
import Button from 'material-ui/Button';
import Dashboard from './pages/dashboard';
import MapPage from './pages/mapPage';
import AppraisalPage from './pages/appraisalPage';
import ApprovalPage from './pages/approvalPage';
import zh from 'react-intl/locale-data/zh';
import en from 'react-intl/locale-data/en';
import zh_CN from './locale/zh_cn_navi';
import en_US from './locale/en_us_navi';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

addLocaleData([...en,...zh]);

const styles = {
    list: {
      width: 250,
    },
    loginButton: {
      float: 'right',
    },
  };

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    anchor: 'left',
    content: <Dashboard />,
    locale: "en",
    messages: en_US
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleContent = (c) => (e) => {
    this.setState({ content: c });
  };

  switchLang = () => (e) => {
    if (this.state.locale=="en") {
      this.setState({locale: "zh", messages: zh_CN});
    } else {
      this.setState({locale: "en", messages: en_US});
    }
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open, content, locale, messages } = this.state;

    const drawer = (
      <IntlProvider locale={locale} messages={messages}>
      <Drawer anchor='left' open={open} onClick={this.handleDrawerClose}>
            <IconButton><ChevronLeft /></IconButton>
          <Divider />
          <div className={classes.list}><List>
            <ListItem button onClick={this.handleContent(<Dashboard />)}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="dashboard" />} />
            </ListItem>
            <ListItem button onClick={this.handleContent(<MapPage />)}>
              <ListItemIcon><MapIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="map" />} />
            </ListItem>
            <ListItem button onClick={this.handleContent(<ApprovalPage />)}>
              <ListItemIcon><DoneIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="approval" />} />
            </ListItem>
            <ListItem button onClick={this.handleContent(<AppraisalPage />)}>
              <ListItemIcon><CompareIcon /></ListItemIcon>
              <ListItemText primary={<FormattedMessage id="appraisal" />} />
            </ListItem>
          <Divider />
          <ListItem button onClick={this.switchLang()}>
            <ListItemIcon><LanguageIcon /></ListItemIcon>
            <ListItemText primary={<FormattedMessage id="lang" />} />
          </ListItem>
          <Divider />
            <ListItem button>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
           </List></div>
      </Drawer>
      </IntlProvider>
    );

    let before = null;
    before = drawer;

    return (
        <div className={classes.appFrame}>
        <IntlProvider locale={locale} messages={messages}>
          <AppBar>
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
          {content}
        </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);