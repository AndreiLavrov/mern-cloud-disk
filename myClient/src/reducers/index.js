import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import fileReducer from '../reducers/fileReducer';
import uploaderReducer from '../reducers/uploaderReducer';
import appReducer from '../reducers/appReducer';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploaderReducer,
  app: appReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
