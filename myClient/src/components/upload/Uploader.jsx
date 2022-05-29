import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './uploader.css';
import UploadFile from './UploadFile';
import { hideUploader } from '../../actions/actionCreators/uploader';

const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();

  const closeHandler = () => dispatch(hideUploader());

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <button className="uploader__close" onClick={closeHandler}>
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
