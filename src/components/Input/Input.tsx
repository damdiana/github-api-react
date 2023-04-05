import React, { HTMLInputTypeAttribute } from 'react';
import './Input.css';

type Props = {
  placeholder: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
};

const Input = ({ placeholder, name, type, className }: Props) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      required
      type={type}
      className={`input ${className}`}
    />
  );
};

export default Input;
