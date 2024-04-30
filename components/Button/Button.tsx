import React, { FC } from 'react';
import './Button.module.scss';

export interface ButtonProps {
  text: string;
  type?: string;
  uiType: string;
  bgColor: string;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
  rest?: any;
}

const Button: FC<ButtonProps> = ({ text, type, uiType, bgColor, color, onClick, disabled, ...rest }) => {
  return (
    <button typeof={type} {...rest} className={`button ${uiType} ${bgColor}`} onClick={onClick} disabled={disabled}>
      <p style={{ color: color }}>{text}</p>
    </button>
  );
};

export default Button;

//https://github.com/oevadee/crib-chat/blob/main/frontend/src/components/Button/Button.stories.tsx
