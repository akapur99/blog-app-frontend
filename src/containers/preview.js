/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import { deletePost } from '../actions/index';


class Preview extends Component {
  deletePost = () => {
    this.props.deletePost(this.props.post.id, this.props.history);
  }

  render() {
    const { post } = this.props;
    const nlink = `/posts/${post.id}`;
    console.log(post);

    return (

      <Card className="card">
        <CardHeader
          title={post.title}
          subheader={post.tags}
        />
        <CardMedia
          className="media"
          // image={post.cover_url}
          image={post.cover_url}
        />
        {/* <CardContent>
          <Typography className="short" component="p">
            {post.content}
          </Typography>
        </CardContent> */}
        <CardActions className="actions" disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button size="small"><Link to={nlink}>View</Link></Button>
          <Button onClick={() => { this.deletePost(); }} size="small">Delete</Button>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    reduxState,
  };
};


// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { deletePost })(Preview));
