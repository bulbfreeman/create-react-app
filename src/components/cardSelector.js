import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const dtFmt = require('dateformat');

const dtSty = "yyyymmdd";
const dtStyN = "yyyy-mmm-dd";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit*0.8,
    maxWidth: 130,
  },
});

function fetchDates(x) {
  let dn = new Date();
  const k = dtFmt(dn.setDate(new Date().getDate()-x), dtSty);
  const n = dtFmt(dn.setDate(new Date().getDate()-x), dtStyN);
  return <MenuItem value={k}>{n}</MenuItem>;
}

class SimpleSelect extends React.Component {
  state = {
    date: '',
  };

  handleChange = event => {
    this.props.passDate(event.target.value);
    this.setState({ date: event.target.value });
  };

  componentDidMount = () => {
    let dn = new Date();
    const k = dtFmt(dn.setDate(new Date().getDate()-1), dtSty);
    this.props.passDate(k);
    this.setState({ date: k });
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            displayEmpty 
            value={this.state.date}
            onChange={this.handleChange}
            input={<Input name="date" id="date-simple" />}
          >
            <MenuItem disabled value="">Report Date</MenuItem>
            {fetchDates(1)}
            {fetchDates(2)}
            {fetchDates(3)}
            {fetchDates(4)}
            {fetchDates(5)}
            {fetchDates(6)}
            {fetchDates(7)}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);