import { PropsWithChildren } from 'react';

import classNames from 'classnames/bind';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

import styles from './CtaButton.module.scss';

const cx = classNames.bind(styles);

interface CtaButtonProps {
  isSidebar?: boolean;
  imageSource: string | StaticImport;
  onClick?: () => void;
}

export default function CtaButton({ children, isSidebar, imageSource, onClick }: PropsWithChildren<CtaButtonProps>) {
  return (
    <button type='button' className={cx(isSidebar ? 'container-sidebar' : 'container-default')} onClick={onClick}>
      <div className={cx('icon')}>
        <Image src={imageSource} alt='icon' />
      </div>
      <span className={cx('text')}>{children}</span>
    </button>
  );
}
