/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signinUser, signupUser } from '../actions/index';


class signinupUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

    onSignUp = () => {
      if (this.state.email === '' || this.state.password === '') {
        alert('You still have to fill out some fields...');
      } else {
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props.signupUser(user, this.props.history);

        this.setState({
          email: '',
          password: '',
        });
      }
    }

    onSignIp = () => {
      if (this.state.email === '' || this.state.password === '') {
        alert('You still have to fill out some fields...');
      } else {
        const user = {
          email: this.state.email,
          password: this.state.password,
        };
        this.props.signupUser(user, this.props.history);

        this.setState({
          email: '',
          password: '',
        });
      }
    }

    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };

    render() {
      return (
        <div className="addBar">
          <form className="container" noValidate autoComplete="off">
            <TextField
              id="outlined-with-placeholder"
              label="Email*"
              placeholder="Enter Email Here!"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            <TextField
              id="outlined-with-placeholder"
              label="Password"
              placeholder="Enter Password Here"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </form>
          <Button onClick={this.onSignUp} variant="contained" color="primary" className="button">
              Sign Up
          </Button>
          <Button onClick={this.onSignUp} variant="contained" color="secondary" className="button">
              Sign In
          </Button>
          <Button onClick={() => {
            this.setState({
              email: '',
              password: '',
            });
          }}
            variant="contained"
            color="default"
            className="button"
          >
              Reset
          </Button>
        </div>
      );
    }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    state,
  }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { signinUser, signupUser })(signinupUser));
