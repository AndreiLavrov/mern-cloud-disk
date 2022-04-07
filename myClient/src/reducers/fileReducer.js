import {
  SET_FILES,
  SET_CURRENT_DIR,
  ADD_FILE,
  SET_POPUP_DISPLAY,
  PUSH_PATH_TO_STACK,
  DELETE_FILE,
} from '../actions/actionTypes/file';

const defaultState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  stackOfPaths: [],
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload };
    case PUSH_PATH_TO_STACK:
      return { ...state, stackOfPaths: [...state.stackOfPaths, action.payload] };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    default:
      return state;
  }
}
