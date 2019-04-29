/* eslint-disable linebreak-style */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';
// import Nav from './navbar';
import AddPost from '../containers/newpost';
import Post from '../containers/post';
import Posts from '../containers/posts';

const Nav = (props) => {
  return (
    <nav>
      <NavLink to="/">My Super Awesome Blog</NavLink>
      <NavLink to="/posts/new">New Post</NavLink>
    </nav>
  );
};


const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={AddPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
