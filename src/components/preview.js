/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import { CardContent } from '@material-ui/core';


class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
    };
  }

  deletePost = () => {
    this.props.deletePost();
  }

  renderLike = () => {
    if (this.state.liked) {
      return (
        <IconButton onClick={() => { this.setState({ liked: false }); }} color="secondary" aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={() => { this.setState({ liked: true }); }} aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
      );
    }
  }

  render() {
    const { post } = this.props;
    const nlink = `/posts/${post.id}`;

    return (
      <Card className="card">
        <CardHeader
          title={post.title}
          subheader={post.tags}
        />
        <CardContent>
          <img alt="" src={post.cover_url} />
        </CardContent>
        <CardActions className="actions" disableActionSpacing>
          {this.renderLike()}
          <Button size="small"><Link to={nlink}>View</Link></Button>
        </CardActions>
      </Card>
    );
  }
}

export default Preview;
