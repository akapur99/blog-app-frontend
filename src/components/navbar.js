import React from 'react';
import {
  BrowserRouter as NavLink,
} from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">My Super Awesome Blog</NavLink></li>
        <li><NavLink to="/posts/new">New Post</NavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
