import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions/index';

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Enter Title Here!',
      tags: 'Enter Tags Here!',
      content: 'Enter Content Here',
      cover_url: 'Enter Cover URL Here',
    };
  }

  onTitleChange = (event) => {
    console.log(event.target.value);
    this.setState({ title: event.target.value });
  }

  onTagsChange = (event) => {
    console.log(event.target.value);
    this.setState({ tags: event.target.value });
  }

  onContentChange = (event) => {
    console.log(event.target.value);
    this.setState({ content: event.target.value });
  }

  onUrlChange = (event) => {
    console.log(event.target.value);
    this.setState({ cover_url: event.target.value });
  }

    onAddPost = () => {
      // this.props.onAddNote(this.state.title);
      const post = {
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        cover_url: this.state.cover_url,
      };
      this.props.createPost(post, this.props.history);

      this.setState({
        title: 'Enter Title Here!',
        tags: 'Enter Tags Here',
        content: 'Enter Content Here',
        cover_url: 'Enter Cover URL Here',
      });
    }

    render() {
      return (
        <div className="addBar">
          <input onChange={this.onTitleChange} value={this.state.title} />
          <input onChange={this.onTagsChange} value={this.state.tags} />
          <input onChange={this.onContentChange} value={this.state.content} />
          <input onChange={this.onUrlChange} value={this.state.cover_url} />
          <button type="submit" onClick={this.onAddPost}>ADD</button>
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
export default withRouter(connect(mapStateToProps, { createPost })(AddPost));
