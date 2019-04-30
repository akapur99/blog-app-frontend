// some imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
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
    console.log(props);
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

  renderPost = () => {
    if (this.state.isEditing) {
      return (
        <div className="edit">
          <input className="editing" onChange={this.onTitleChange} value={this.state.title} />
          <input className="editing" onChange={this.onUrlChange} value={this.state.cover_url} />
          <input className="editing" onChange={this.onContentChange} value={this.state.content} />
          <input className="editing" onChange={this.onTagsChange} value={this.state.tags} />
          <button onClick={() => { this.deletePost(this.props.match.params.postID); }} type="submit">DELETE</button>
          <button onClick={() => { this.updatePost(this.props.match.params.postID); }} type="submit">UPDATE</button>
        </div>
      );
    } else if (this.props !== undefined) {
      const { currentPost } = this.props;
      console.log(currentPost);

      return (
        <Card className="card">
          <CardHeader
            onFocus={() => { this.setState({ isEditing: true }); }}
            title={currentPost.title}
            subheader={currentPost.tags}
          />
          <CardMedia
            className="media"
            image="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg"
            title=""
          />
          <CardContent onFocus={() => { this.setState({ isEditing: true }); }}>
            <Typography component="p">
              {currentPost.content}
            </Typography>
          </CardContent>
          <CardActions className="actions" disableActionSpacing>
            <Button onClick={() => { this.deletePost(this.props.match.params.postID); }} size="small">Delete</Button>
            <Button onClick={() => { this.setState({ isEditing: true }); }} size="small">Edit</Button>
          </CardActions>
        </Card>
      // <div>
      //   <button onFocus={() => { this.setState({ isEditing: true }); }} type="submit">{this.props.currentPost.title}</button>
      //   <button onFocus={() => { this.setState({ isEditing: true }); }} type="submit">{this.props.currentPost.tags}</button>
      //   <button onFocus={() => { this.setState({ isEditing: true }); }} type="submit">{this.props.currentPost.content}</button>
      //   <button onFocus={() => { this.setState({ isEditing: true }); }} type="submit">{this.props.currentPost.cover_url}</button>
      //   <button onClick={() => { this.deletePost(this.props.match.params.postID); }} type="submit">DELETE</button>
      //   <button onClick={() => { this.updatePost(this.props.match.params.postID); }} type="submit">UPDATE</button>
      // </div>

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
