import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../api/file';
import FileList from './FileList';

import './drive.css';
import Popup from './PopUp';
import { setPopupDisplay } from '../../actions/actionCreators/file';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDir]);

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'));
  };

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className="disk__create" onClick={showPopupHandler}>
          Создать папку
        </button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
