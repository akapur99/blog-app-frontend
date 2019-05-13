import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { signoutUser } from '../actions/index';

class Nav extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  onSignOut = () => {
    this.props.signoutUser(this.props.history);
  }

  renderNavBar = () => {
    if (this.props.reduxState.auth.authenticated) {
      return (
        <nav>
          <Button color="inherit"><Link to="/">My Super Awesome Blog</Link></Button>
          <Button color="inherit"><Link to="/posts/new">New Post</Link></Button>
          <Button color="inherit" onClick={this.onSignOut}>Sign Out</Button>
        </nav>
      );
    } else {
      return (
        <nav>
          <Button color="inherit"><Link to="/">My Super Awesome Blog</Link></Button>
          <Button color="inherit"><Link to="/posts/new">New Post</Link></Button>
          <Button color="inherit"><Link to="/auth">Sign In/Up</Link></Button>
        </nav>
      );
    }
  }

  render() {
    return (
      <div className="navDiv">
        <AppBar position="static" color="default" className={this.props.classes.nav}>
          <Toolbar>
            <Typography variant="h6" color="secondary" className={this.props.classes.header}>
            Abhi Blog CS52 — 19S
            </Typography>
            <div className={this.props.classes.menu}>
              {this.renderNavBar()}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  menu: {
    display: 'flex',
  },
  header: {
    marginRight: 'auto',
  },
  nav: {
    boxShadow: '0px 0px',
    width: '100%',
  },
};


// connects particular parts of redux state to this components props
const mapStateToProps = (reduxState) => {
  return {
    reduxState,
  };
};

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { signoutUser })(withStyles(styles)(Nav)));
