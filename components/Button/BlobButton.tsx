import React from 'react';

import styles from './BlobButton.module.scss';

export interface ButtonProps {
  text: 'BLOB' | '취소';
  type: 'submit' | 'reset' | 'button' | undefined;
  color: 'button-colord-contain' | 'button-colord-outlined' | 'button-gray-contain' | 'button-gray-outlined';
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ text, type, color, onClick, disabled }: ButtonProps) {
  return (
    // TODO: type 에서 에러 처리
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${styles[color]}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
