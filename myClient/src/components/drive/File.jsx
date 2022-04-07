import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './file.css';
import dirLogo from '../../assets/img/dir.svg';
import fileLogo from '../../assets/img/file.svg';
import { pushPathToStack, setCurrentDir } from '../../actions/actionCreators/file';
import { deleteFile, downloadFile } from '../../api/file';

const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDirHandler = () => {
    if (file.type !== 'dir') return;
    dispatch(pushPathToStack(currentDir));
    dispatch(setCurrentDir(file._id));
  };

  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteClickHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  return (
    <div className="file" onClick={openDirHandler}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== 'dir' && (
        <button onClick={downloadClickHandler} className="file__btn file__download">
          download
        </button>
      )}
      <button onClick={deleteClickHandler} className="file__btn file__delete">
        delete
      </button>
    </div>
  );
};

export default File;
