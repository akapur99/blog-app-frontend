/* eslint-disable no-alert */
import axios from 'axios';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=abhi_kapur';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  ERROR: 'ERROR',
};

export function fetchPosts() { /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
    }).catch((error) => {
    // hit an error do something else!
      console.log('ERROR::: ');
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Fetching Posts!');
    });
  };
}

export function createPost(post, history) { /* axios post */
  const fields = {
    title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  };

  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then((response) => {
      dispatch({ type: 'CREATE_POST', payload: { posts: response.data } });
      console.log(response);
      history.push(`/posts/${response.data._id}`);
      // history.push('/');
    }).catch((error) => {
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Creating Post!');
      history.push('/');
    });
  };
}

export function updatePost(id, post) { /* axios put */
  const fields = {
    title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  };

  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}?${API_KEY}`, fields).then((response) => {
      dispatch({ type: 'UPDATE_POST', payload: { posts: response.data } });
      console.log(response);
    }).catch((error) => {
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Updating Post!');
    });
  };
}

export function fetchPost(id) { /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?${API_KEY}`).then((response) => {
    // do something with response.data  (some json)
      dispatch({ type: 'FETCH_POST', payload: { posts: response.data } });
    }).catch((error) => {
    // hit an error do something else!
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Fetching Post!');
    });
  };
}

export function deletePost(id, history) { /* axios delete */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?${API_KEY}`).then((response) => {
      console.log(response);
      dispatch({ type: 'DELETE_POST', payload: { posts: response.data } });
      history.push('/');
    }).catch((error) => {
      console.log('Error in fetching posts');
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Deleting Post!');
    });
  };
}

export function deletePostPrev(id) { /* axios delete */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?${API_KEY}`).then((response) => {
      console.log(response);
      dispatch({ type: 'DELETE_POST', payload: { posts: response.data } });
    }).catch((error) => {
      console.log('Error in fetching posts');
      console.log(error);
      dispatch({ type: 'ERROR', error });
      alert('Error in Deleting Post!');
    });
  };
}
