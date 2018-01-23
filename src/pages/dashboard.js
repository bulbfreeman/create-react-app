import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions, } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import EnhancedTable from '../components/dashBoardComponents';
import SimpleCard from '../components/card';

const styles = theme => ({
  root: {
    paddingTop: 80,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class Dashboard extends React.Component {
  static isPrivate = true;

  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <SimpleCard sysName={'MDS'} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);