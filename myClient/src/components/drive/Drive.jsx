import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../../api/file';
import FileList from './FileList';

import './drive.css';
import Popup from './PopUp';
import Uploader from '../upload/Uploader';
import { setCurrentDir, setPopupDisplay } from '../../actions/actionCreators/file';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const stackOfPaths = useSelector((state) => state.files.stackOfPaths);
  const isLoading = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDir, sort]);

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

  const stopping = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const dragEnterHandler = (event) => {
    stopping(event);
    setDragEnter(true);
  };

  const dragLeaveHandler = (event) => {
    stopping(event);
    setDragEnter(false);
  };

  const dropHandler = (event) => {
    stopping(event);
    const files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (isLoading) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="drive"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="drive__btns">
        <button className="drive__back" onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className="drive__create" onClick={() => showPopupHandler()}>
          Создать папку
        </button>
        <div className="drive__upload">
          <label htmlFor="drive__upload-input" className="drive__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type="file"
            id="drive__upload-input"
            className="drive__upload-input"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="drive__select">
            <option value="name">По имени</option>
            <option value="type">По типу</option>
            <option value="date">По дате</option>
          </select>
        </div>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
