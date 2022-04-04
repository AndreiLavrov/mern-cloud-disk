import React, { useState } from 'react';

import Input from '../../utils/input/Input';
import './authorisation.css';
import { registration } from '../../api/authorisation.js';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className='authorisation'>
        <div className="authorisation__header">Регистрация</div>
        <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
        <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
        <button className="authorisation__btn" onClick={() => registration(email, password)}>Зарегистрироваться</button>
      </div>
    );
};

export default Registration;
