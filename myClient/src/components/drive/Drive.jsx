import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../api/file';
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

  const backClickHandler = () => {
    const backDirId = stackOfPaths.pop();
    dispatch(setCurrentDir(backDirId));
  };

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'));
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={backClickHandler}>
          Назад
        </button>
        <button className="disk__create" onClick={showPopupHandler}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
