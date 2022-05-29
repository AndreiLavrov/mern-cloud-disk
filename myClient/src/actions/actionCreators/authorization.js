import { SET_USER, LOGOUT } from '../actionTypes/authorization';

export const setUser = (user) => ({ type: SET_USER, payload: { user } });
export const logout = () => ({ type: LOGOUT });
