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
  deletePost = () => {
    this.props.deletePost();
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
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button size="small"><Link to={nlink}>View</Link></Button>
        </CardActions>
      </Card>
    );
  }
}

export default Preview;
