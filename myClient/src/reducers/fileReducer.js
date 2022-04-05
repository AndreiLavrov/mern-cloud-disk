import { SET_FILES, SET_CURRENT_DIR } from '../actions/actionTypes/file';

const defaultState = {
  files: [],
  currentDir: null,
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    default:
      return state;
  }
}
