import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { auth } from '../api/authorisation.js';
import Navbar from './navbar/Navbar';
import './app.css';
import Registration from './authorisation/Registration';
import Login from './authorisation/Login.jsx';

function App() {
	const isAuth = useSelector(state => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth());
	}, []);

	return (
		<BrowserRouter>
			<div className="app">
				<Navbar/>
				<div className="wrap">
					{!isAuth && (
						<Routes>
							<Route path="/registration" element={<Registration />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					)}
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
