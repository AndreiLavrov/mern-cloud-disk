import {
  SET_FILES,
  SET_CURRENT_DIR,
  ADD_FILE,
  SET_POPUP_DISPLAY,
  PUSH_PATH_TO_STACK,
} from '../actionTypes/file';

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display) => ({ type: SET_POPUP_DISPLAY, payload: display });
export const pushPathToStack = (path) => ({ type: PUSH_PATH_TO_STACK, payload: path });
