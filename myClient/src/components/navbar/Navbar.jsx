import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import Logo from '../../assets/img/navbar-logo.svg';
import { logout } from '../../actions/actionCreators/authorization';
import '../../components/navbar/navbar.css';
import { showLoader } from '../../actions/actionCreators/app';
import { getFiles, searchFiles } from '../../api/file';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.user.currentDir);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  const searchChangeHandler = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== '') {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        {/* <img src={Logo} alt="" className="navbar__logo"/>*/}
        {isAuth && (
          <input
            value={searchName}
            onChange={searchChangeHandler}
            className="navbar__search"
            type="text"
            placeholder="Название файла..."
          />
        )}
        <div className="navbar__header">MERN CLOUD</div>
        {!isAuth ? (
          <>
            <div className="navbar__login">
              <NavLink to="/login">Войти</NavLink>
            </div>
            <div className="navbar__registration">
              <NavLink to="/registration">Регистрация</NavLink>
            </div>
          </>
        ) : (
          <div className="navbar__login" onClick={() => dispatch(logout())}>
            Выйти
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
