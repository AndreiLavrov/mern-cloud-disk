import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteAvatar, uploadAvatar } from '../../api/user';

const Profile = () => {
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  return (
    <div>
      <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
      <input type="file" placeholder="Загрузить аватар" accept="image/*" onChange={changeHandler} />
    </div>
  );
};

export default Profile;
