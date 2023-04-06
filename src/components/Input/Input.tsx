import React, { HTMLInputTypeAttribute } from 'react';
import './Input.css';

type Props = {
  placeholder: string;
  name: string;
  type: HTMLInputTypeAttribute;
  className?: string;
  disabled?: boolean;
};

const Input = ({ placeholder, name, type, className, disabled }: Props) => {
  return (
    <input
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      required
      type={type}
      className={`input ${className}`}
    />
  );
};

export default Input;
