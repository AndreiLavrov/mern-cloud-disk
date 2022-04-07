import React from 'react';
import { useDispatch } from 'react-redux';

import './uploader.css';
import { removeUploadFile } from '../../actions/actionCreators/uploader';

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  debugger;
  const removeUploadFileHandler = () => dispatch(removeUploadFile(file.id));

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <button className="upload-file__remove" onClick={removeUploadFileHandler}>
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div className="upload-file__upload-bar" style={{ width: file.progress + '%' }} />
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
