import React from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import AccountIcon from 'material-ui-icons/AccountCircle';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button/Button';
import signInAction from '../actions';

const styles = theme => ({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit*20,
    },
    button: {
        margin: theme.spacing.unit*2,
    },
});

class Login extends React.Component {
    static isPrivate = false;

    state = {
      username: '',
      password: '',
      showPassword: false,
      warningMsg: 'Autentication Failed',
    };

    submit = () => {
        this.props.signInAction(this.state.username,this.state.password, this.props.history);
    }

    errorMsg = () => {
        if (this.props.errorMessage) {
            return this.state.warningMsg;
        }
    }

    handleMouseDownPassword = (e) => {
      e.preventDefault();
    };
    
    handleClickShowPasssword = () => {
      this.setState({ showPassword: !this.state.showPassword });
    };

    handleChange = (prop) => (e) => {
        this.setState({ [prop]: e.target.value });
    };

    handleLogin = () => (e) => {
        this.setState({ warningMsg: 'Autentication Failed' });
    }
    
    render() {
        const { classes, handleSubmit } = this.props;
        const { warningMsg, locale, messages } = this.state;


        return (
            <div className={classes.root}>
                <Typography type="display1" color="primary" gutterBottom>CDMI sign in</Typography>
                <form onSubmit={handleSubmit(this.submit)}>
                <FormControl>
                    <InputLabel htmlFor="username">Username
                    </InputLabel>
                    <Input
                        id="adornment-username"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton><AccountIcon /></IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl><br/><br/>
                <FormControl >
                    <InputLabel htmlFor="password">Password
                    </InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                            onClick={this.handleClickShowPasssword}
                            onMouseDown={this.handleMouseDownPassword}
                            >
                            {!this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
               
                </FormControl>
                <br/>
                <Button raised type="submit" color="primary" className={classes.button} onClick={this.handleLogin()}> 
                    Login
                </Button>
                </form>
                <Typography color="accent" type="subheading" gutterBottom>
                    {this.errorMsg()}
                </Typography>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

const reduxFromSignin = reduxForm({form: 'signin'})(withStyles(styles)(Login));

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, {signInAction})(reduxFromSignin);