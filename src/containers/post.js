// some imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, updatePost } from '../actions/index';


class Post extends Component {
  constructor(props) {
    super(props);

    console.log('Within post:');
    console.log(props);
  }

  componentDidMount(props) {
    console.log(this.props.match.params.postID);

    this.props.fetchPost(this.props.match.params.postID);
  }

  deletePost = (id) => {
    this.props.deletePost(id, this.props.history);
  }

  updatePost = (id) => {
    const post = {
      title: 'UPDATE SUCCESS',
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      cover_url: this.props.currentPost.cover_url,
    };
    this.props.updatePost(id, post);
  }

  renderPost = () => {
    if (this.props !== undefined) {
      return (
        <div>
          <button type="submit">{this.props.currentPost.title}</button>
          <button type="submit">{this.props.currentPost.tags}</button>
          <button type="submit">{this.props.currentPost.content}</button>
          <button type="submit">{this.props.currentPost.cover_url}</button>
          <button onClick={() => { this.deletePost(this.props.match.params.postID); }} type="submit">DELETE</button>
          <button onClick={() => { this.updatePost(this.props.match.params.postID); }} type="submit">UPDATE</button>
        </div>
      );
    } else {
      return (
        <h2>FETCHING</h2>
      );
    }
  }

  render() {
    return (
      <div className="post">
        {this.renderPost()}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    currentPost: reduxState.posts.current,
  };
};
// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
