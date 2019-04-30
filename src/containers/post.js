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
import { fetchPost, deletePost, updatePost } from '../actions/index';

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
    };

    this.props.updatePost(id, post);
    this.setState({
      isEditing: false,
    });
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
            onFocus={() => { this.setState({ isEditing: true }); }}
            title={currentPost.title}
            subheader={currentPost.tags}
          />
          <CardContent>
            <img className="postImg" alt="" src={currentPost.cover_url} />
          </CardContent>
          <CardContent onFocus={() => { this.setState({ isEditing: true }); }}>
            <Typography component="p">
              {currentPost.content}
            </Typography>
          </CardContent>
          <CardActions className="actions" disableActionSpacing>
            <Button onClick={() => { this.deletePost(this.props.match.params.postID); }} size="small">Delete</Button>
            <Button onClick={() => {
              this.setState({
                isEditing: true,
                title: currentPost.title,
                tags: currentPost.tags,
                content: currentPost.content,
                cover_url: currentPost.cover_url,
              });
            }}
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
  };
};
// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post);
