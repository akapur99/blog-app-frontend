/* eslint-disable no-alert */
import axios from 'axios';

// const ROOT_URL = 'https://cs52-abhi-blog.herokuapp.com/api';
const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const API_KEY = '?key=abhi_kapur';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  UPDATE_POST: 'UPDATE_POST',
  CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
  ERROR: 'ERROR',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// deletes token from localstorage
// and deauths
export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}


export function fetchPosts() { /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
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
  console.log(post);
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`,
      post,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: 'CREATE_POST', payload: { posts: response.data } });
        console.log(response);
        history.push('/');
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
  // const fields = {
  //   title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  // };

  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`,
      post,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
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
    axios.get(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
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
    axios.delete(`${ROOT_URL}/posts/${id}`,
      { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
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


export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        console.log(response);
        history.push('/');
      }).catch((error) => {
        console.log(error);
        dispatch(authError(`Sign In Failed: ${error.response.data}`));
        alert('Error in Creating Post!');
      });
  };
}


export function signupUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then((response) => {
        dispatch({ type: ActionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        console.log(response);
        history.push('/');
      }).catch((error) => {
        console.log(error);
        dispatch(authError(`Sign Up Failed: ${error.response.data}`));
        alert('Error in Creating Post!');
      });
  };
}
