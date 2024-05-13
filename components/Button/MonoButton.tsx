import React, { PropsWithChildren } from 'react';

import styles from './MonoButton.module.scss';

export interface MonoButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void;
  disabled?: boolean;
}

export default function MonoButton({
  children,
  type,
  size = 'medium',
  onClick,
  disabled,
}: PropsWithChildren<MonoButtonProps>) {
  return (
    // TODO: type 에서 에러 처리
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={`${styles['button-mono']} ${styles[size]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
