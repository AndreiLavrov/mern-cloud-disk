import { SET_USER, LOGOUT } from '../actionTypes/authorisation.js';

export const setUser = (user) => ({ type: SET_USER, payload: { user } });
export const logout = () => ({ type: LOGOUT });
