import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const Nav = (props) => {
  const { classes } = props;
  return (
    <div className="navDiv">
      <AppBar position="static" color="default" className={classes.nav}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.header}>
            Abhi Blog CS52 — 19S
          </Typography>
          <div className={classes.menu}>
            <nav>
              <Button color="inherit"><Link to="/">My Super Awesome Blog</Link></Button>
              <Button color="inherit"><Link to="/posts/new">New Post</Link></Button>
            </nav>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

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


export default withStyles(styles)(Nav);
