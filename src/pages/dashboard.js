import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SimpleCard from '../components/card';

const styles = theme => ({
  subPage: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

class Dashboard extends React.Component {

  static isPrivate = true;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.subPage}>
        <SimpleCard sysName={'MDS'} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);