import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const dtFmt = require('dateformat');

const dtSty = "yyyymmdd";
const dtStyN = "yyyy/mm/dd";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.date}
            onChange={this.handleChange}
            input={<Input name="date" id="date-simple" />}
          >
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