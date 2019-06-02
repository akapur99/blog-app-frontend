/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createPost } from '../actions/index';
import { uploadImage } from '../s3';


class AddPost extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      title: '',
      tags: '',
      content: '',
    };
  }

    addPost = (url) => {
      const post = {
        title: this.state.title,
        tags: this.state.tags,
        content: this.state.content,
        // eslint-disable-next-line no-undef
        cover_url: url,
        author: this.props.state.author,
      };
      this.props.createPost(post, this.props.history);

      this.setState({
        title: '',
        tags: '',
        content: '',
      });
    }

    onAddPost = () => {
      if (this.state.title === '' || this.state.content === '') {
        alert('You still have to fill out some fields...');
      } else if (this.state.file) {
        uploadImage(this.state.file).then((url) => {
          // use url for content_url and
          this.addPost(url);
        }).catch((error) => {
          // handle error
          const u = 'https://images.unsplash.com/photo-1484312152213-d713e8b7c053?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
          this.addPost(u);
          console.log('ERROR IN SETTING URL', error);
        });
      }
    }

    onImageUpload = (event) => {
      const file = event.target.files[0];
      // Handle null file
      // Get url of the file and set it to the src of preview
      console.log(file);

      if (file !== undefined) {
        this.setState({ preview: window.URL.createObjectURL(file), file });
      }
    }

    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };

    render() {
      return (
        <div className="addBar">
          <img id="preview" alt="preview" src={this.state.preview} />
          <input type="file" name="coverImage" onChange={this.onImageUpload} />
          <form className="container" noValidate autoComplete="off">
            <TextField
              id="outlined-with-placeholder"
              label="Title*"
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
              id="outlined-full-width"
              label="Content*"
              style={{ margin: 8 }}
              placeholder="Enter Content Here!"
              helperText="Go Wild! (* = Required)"
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
