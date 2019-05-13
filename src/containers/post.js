/* eslint-disable no-alert */
// some imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  getUser, fetchPost, deletePost, updatePost,
} from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      title: this.props.currentPost.title,
      tags: this.props.currentPost.tags,
      content: this.props.currentPost.content,
      cover_url: this.props.currentPost.cover_url,
    };
  }

  componentDidMount(props) {
    this.props.fetchPost(this.props.match.params.postID);
  }

  deletePost = (id) => {
    this.props.deletePost(id, this.props.history);
  }

  updatePost = (id) => {
    const post = {
      title: this.state.title,
      tags: this.state.tags,
      content: this.state.content,
      cover_url: this.state.cover_url,
      author: this.props.currentPost.author,
    };

    this.props.updatePost(id, post);
    this.setState({
      isEditing: false,
    });
  }

  checkUser = (id, type) => {
    this.props.getUser(id);
    const { currentPost } = this.props;
    if (this.props.username === currentPost.username) {
      if (type === 'update') {
        this.setState({
          isEditing: true,
          title: currentPost.title,
          tags: currentPost.tags,
          content: currentPost.content,
          cover_url: currentPost.cover_url,
        });
      } else {
        this.deletePost(id);
      }
    } else {
      alert('You don\'t have the required permission to edit/delete this!!!');
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderPost = () => {
    if (this.state.isEditing) {
      return (
        <div className="addBar">
          <form className="container" noValidate autoComplete="off">
            <TextField
              id="outlined-with-placeholder"
              label="Title"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.title}
              onChange={this.handleChange('title')}
            />
            <TextField
              id="outlined-with-placeholder"
              label="Tags"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.tags}
              onChange={this.handleChange('tags')}
            />
            <TextField
              id="outlined-textarea"
              label="URL"
              multiline
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.cover_url}
              onChange={this.handleChange('cover_url')}
            />
            <TextField
              id="outlined-full-width"
              label="Content"
              style={{ margin: 8 }}
              helperText="Go Wild!"
              fullWidth
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.content}
              onChange={this.handleChange('content')}
            />
          </form>
          <Button onClick={() => { this.updatePost(this.props.match.params.postID); }} variant="contained" color="primary" className="button">
              Update
          </Button>
          <Button onClick={() => { this.deletePost(this.props.match.params.postID); }}
            variant="contained"
            color="secondary"
            className="button"
          >
              Delete
          </Button>
          <Button onClick={() => { this.setState({ isEditing: false }); }}
            variant="contained"
            color="default"
            className="button"
          >
              Cancel
          </Button>
        </div>

      );
    } else if (this.props !== undefined) {
      const { currentPost } = this.props;

      return (
        <Card className="card">
          <CardHeader
            title={currentPost.title}
            subheader={currentPost.tags}
            content={currentPost.username}
          />
          <CardHeader
            subheader={currentPost.username}
          />
          <CardContent>
            <img className="postImg" alt="" src={currentPost.cover_url} />
          </CardContent>
          <CardContent>
            <Typography component="p">
              {currentPost.content}
            </Typography>
          </CardContent>
          <CardActions className="actions" disableActionSpacing>
            <Button onClick={() => { this.checkUser(this.props.match.params.postID, 'delete'); }} size="small">Delete</Button>
            <Button onClick={() => { this.checkUser(this.props.match.params.postID, 'update'); }}
              size="small"
            >Edit
            </Button>
          </CardActions>
        </Card>
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
    username: reduxState.auth.username,
  };
};
// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, {
  getUser, fetchPost, deletePost, updatePost,
})(Post);
