import { SET_FILES, SET_CURRENT_DIR } from '../actionTypes/file';

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
