import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupDisplay } from '../../actions/actionCreators/file';
import Input from '../../utils/input/Input';
import { createDir } from '../../api/file';

const PopUp = () => {
  const [dirName, setDirName] = useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  const hidePopUpHandler = () => {
    dispatch(setPopupDisplay('none'));
  };

  const createHandler = () => {
    dispatch(createDir(currentDir, dirName));
    hidePopUpHandler();
  };

  return (
    <div className="popup" onClick={hidePopUpHandler} style={{ display: popupDisplay }}>
      <div className="popup__content" onClick={(event) => event.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close" onClick={hidePopUpHandler}>
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button className="popup__create" onClick={createHandler}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default PopUp;
