import axios from 'axios';
import { setUser } from '../actions/actionCreators/authorization';

import { API_URL } from '../config';

export const uploadAvatar = (file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_URL}/api/profile/avatar`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};

export const deleteAvatar = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}/api/profile/avatar`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
};
