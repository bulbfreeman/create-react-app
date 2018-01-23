import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import SimpleSelect from './cardSelector';

// const dtFmt = require('dateformat');
// const dtSty = "yyyymmdd";

const styles = theme => ({
  card: {
    maxWidth: 310,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

// function fetchDates(x) {
//         let dn = new Date();
//         const k = dtFmt(dn.setDate(new Date().getDate()-x), dtSty);
//         return <MenuItem value={k}>{k}</MenuItem>;
// }


function SimpleCard(props) {
  const { classes } = props;
  const system = props.sysName;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2">{system}</Typography>
          <Typography component="p">
          <p>Total Breaks: </p> 
          <p>New Breaks: </p>
          <p>Report Status: </p> 
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense>Download Report</Button>
          {/* <FormControl className={classes.formControl}>
            <Select value={1} name="date" >
                {fetchDates(1)}
                {fetchDates(2)}
                {fetchDates(3)}
                {fetchDates(4)}
                {fetchDates(5)}
                {fetchDates(6)}
                {fetchDates(7)}
            </Select>
          </FormControl> */}
          <SimpleSelect />
        </CardActions>
        <br/>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);