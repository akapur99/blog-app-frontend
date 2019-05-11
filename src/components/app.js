/* eslint-disable new-cap */
/* eslint-disable linebreak-style */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import Nav from '../containers/navbar';
import AddPost from '../containers/newpost';
import Post from '../containers/post';
import Posts from '../containers/posts';
import signinupUser from '../containers/auth';
import RequireAuth from '../containers/requireAuth';


const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={RequireAuth(AddPost)} />
          <Route path="/auth" component={signinupUser} />
          <Route path="/posts/:postID" component={RequireAuth(Post)} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
