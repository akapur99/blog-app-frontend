import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPosts } from '../actions/index';
import Preview from './preview';

class Posts extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount = () => {
    this.props.fetchPosts();
  }

  renderPosts = () => {
    if (this.props.posts.all.length > 0) {
      return (
        this.props.posts.all.map((item, key) => {
          console.log(item, key);
          // const nlink = `/posts/${item.id}`;
          return (
            // <div className="postPreview" key={item.id}>
            //   <Link to={nlink}>
            //     <img alt="" src={item.cover_url} />
            //     <span>{item.title}</span> <span>{item.tags}</span>
            //   </Link>
            // </div>
            <Preview post={item} key={item.id} />
          );
        })
      );
    } else {
      return (
        <h2>Waiting for Posts</h2>
      );
    }
  }

  render() {
    console.log('Props');
    console.log(this.props.posts);

    return (
      <div className="postList">
        {this.renderPosts()}
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (reduxState) => {
  return {
    posts: reduxState.posts,
  };
};

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
