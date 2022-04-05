import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import Logo from '../../assets/img/navbar-logo.svg';
import { logout } from '../../actions/actionCreators/authorization';
import '../../components/navbar/navbar.css';

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="container">
        {/* <img src={Logo} alt="" className="navbar__logo"/>*/}
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
