import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SimpleSelect from './cardSelector';
import Table from 'material-ui/Table/Table';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';
import TableBody from 'material-ui/Table/TableBody';
import CardHeader from 'material-ui/Card/CardHeader';

const styles = theme => ({
  table: {
    maxWidth: 270,
    paddingLeft: 0,
  },
  card: {
    maxWidth: 310,
  },
});

const baseAPI = "http://SGNPF0SXXC5:20017/";

class SimpleCard extends React.Component {

  state = {
    date: '',
    status: 'N/A',
    total: 'N/A',
    newBk: 'Not Available',
  };

  onDateChange = (dt) => {
    this.setState({date: dt});

    fetch(baseAPI+`summary/`+this.props.sysName+`/`+dt)
		.then(r=>r.json())
		.then(data=>this.setState({total: data.total, newBk: data.new}))
    .catch(this.setState({total: 'N/A', newBk: 'N/A'}));
    
		fetch(baseAPI+`status/`+this.props.sysName+`/`+dt)
		.then(r=>r.json())
		.then(data=>this.setState({status: data.status}))
		.catch(this.setState({status: 'Not Available'}));
  }

  dlRpt = () => {
		var a = document.createElement('a');
    a.href = baseAPI+`report/`+this.props.sysName+`/`+this.state.date;
    a.download="CDMI-"+this.props.sysName+"-"+this.state.date+".xlsx";
    a.click();
  }

  render(){
    const { classes } = this.props;
    const system = this.props.sysName;
    return (
      <div>
        <Card className={classes.card} elevation={7}>
          <CardContent>
            <Typography color="primary" type="headline" component="h2">{system}</Typography>
            <br/>
            <Table className={classes.table}><TableBody>
              <TableRow>
                <TableCell>Total Breaks</TableCell>
                <TableCell numeric>{this.state.total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>New Breaks</TableCell>
                <TableCell numeric>{this.state.newBk}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Report Status</TableCell>
                <TableCell numeric>{this.state.status}</TableCell>
              </TableRow>
            </TableBody></Table>
          </CardContent>
          <CardActions>
            <SimpleSelect passDate={this.onDateChange.bind(this)} />
            <Button raised dense color="primary" onClick={()=>{this.dlRpt()}}>Download Report</Button>
          </CardActions>
          <br/>
        </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);