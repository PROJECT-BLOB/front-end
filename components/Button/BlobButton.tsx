import React from 'react';

import styles from './BlobButton.module.scss';

export interface ButtonProps {
  text: 'BLOB' | '취소' | '회원가입' | '로그인';
  type: 'submit' | 'button';
  color: 'button-colord-contain' | 'button-colord-outlined' | 'button-gray-contain' | 'button-gray-outlined';
  onClick?: () => void;
  disabled?: boolean;
}

export default function BlobButton({ text, type, color, onClick, disabled }: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${styles[color]}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
