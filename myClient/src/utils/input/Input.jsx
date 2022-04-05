import React from 'react';
import './input.css';

const Input = ({ value, type, placeholder, setValue }) => {
  return (
    <input
      onChange={(event) => setValue(event.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
