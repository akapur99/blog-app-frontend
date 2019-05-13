import { ActionTypes } from '../actions';

const AuthReducer = (state = { authenticated: false, username: '' }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, authenticated: true };
    case ActionTypes.DEAUTH_USER:
      return { ...state, authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { ...state, authenticated: false };
    case ActionTypes.GET_USERNAME:
      return { ...state, authenticated: true, username: action.payload.username };
    default:
      return state;
  }
};

export default AuthReducer;
