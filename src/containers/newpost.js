import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createPost } from '../actions/index';


class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
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
        title: '',
        tags: '',
        content: '',
        cover_url: '',
      });
    }

    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };

    render() {
      return (
        <div className="addBar">
          {/* <input onChange={this.onTitleChange} value={this.state.title} />
          <input onChange={this.onTagsChange} value={this.state.tags} />
          <input onChange={this.onContentChange} value={this.state.content} />
          <input onChange={this.onUrlChange} value={this.state.cover_url} />
          <button type="submit" onClick={this.onAddPost}>ADD</button> */}

          <form className="container" noValidate autoComplete="off">
            <TextField
              id="outlined-with-placeholder"
              label="Title"
              placeholder="Enter Title Here!"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.title}
              onChange={this.handleChange('title')}
            />
            <TextField
              id="outlined-with-placeholder"
              label="Tags"
              placeholder="Enter Tags Here (put a space in between)"
              className="textField"
              margin="normal"
              variant="outlined"
              value={this.state.tags}
              onChange={this.handleChange('tags')}
            />
            <TextField
              id="outlined-textarea"
              label="URL"
              placeholder="Cover Image URL"
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
              placeholder="Enter Content Here!"
              helperText="Go Wild!"
              fullWidth
              margin="normal"
              variant="outlined"
              value={this.state.content}
              onChange={this.handleChange('content')}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <Button onClick={this.onAddPost} variant="contained" color="primary" className="button">
              Add
          </Button>
          <Button onClick={() => {
            this.setState({
              title: '',
              tags: '',
              content: '',
              cover_url: '',
            });
          }}
            variant="contained"
            color="secondary"
            className="button"
          >
              Reset
          </Button>
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
