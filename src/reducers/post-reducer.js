import { ActionTypes } from '../actions';

const PostReducer = (state = { all: [], current: {} }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload.posts };
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload.posts };
    case ActionTypes.CREATE_POST:
      return { ...state, current: action.payload.posts };
    case ActionTypes.UPDATE_POST:
      return { ...state, current: action.payload.posts };
    default:
      return state;
  }
};

export default PostReducer;
