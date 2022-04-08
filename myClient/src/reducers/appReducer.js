import { HIDE_LOADER, SHOW_LOADER } from '../actions/actionTypes/app';

const defaultState = {
  loader: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    default:
      return state;
  }
}
