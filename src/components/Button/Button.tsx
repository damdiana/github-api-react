import React, { PropsWithChildren } from 'react';
import './Button.css';

type Props = {
  variant: 'text' | 'outline';
  color?: 'navy' | 'black';
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button = ({
  variant,
  color = 'navy',
  type = 'button',
  onClick,
  children,
  className = '',
}: PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${color} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
