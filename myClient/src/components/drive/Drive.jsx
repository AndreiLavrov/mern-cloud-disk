import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../api/file';
import FileList from './FileList';

import './drive.css';
import Popup from './PopUp';
import { setCurrentDir, setPopupDisplay } from '../../actions/actionCreators/file';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const stackOfPaths = useSelector((state) => state.files.stackOfPaths);

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDir]);

  const goBack = () => {
    const backDirId = stackOfPaths.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'));
  };

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={goBack}>
          Назад
        </button>
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
