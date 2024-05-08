import React from 'react';

import styles from './MonoButton.module.scss';

export interface MonoButtonProps {
  text: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void;
  disabled?: boolean;
}

export default function MonoButton({ text, type, size = 'medium', onClick, disabled }: MonoButtonProps) {
  return (
    // TODO: type 에서 에러 처리
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${styles['button-mono']} ${styles[size]}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
