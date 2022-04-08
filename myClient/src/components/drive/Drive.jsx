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

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => showPopupHandler()}>
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
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="disk__select">
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
