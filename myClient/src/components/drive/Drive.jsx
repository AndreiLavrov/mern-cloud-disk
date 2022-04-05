import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from '../../api/file';
import FileList from './FileList';

import './disk.css';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDir]);

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className="disk__create">Создать папку</button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;
