import React, { PropsWithChildren } from 'react';
import './Button.css';

type Props = {
  variant: 'text' | 'outline';
  color?: 'navy' | 'black';
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  variant,
  color = 'navy',
  type = 'button',
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant} btn-${color}`}
    >
      {children}
    </button>
  );
};

export default Button;
