import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseButton from '@icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import styles from './ModalHeader.module.scss';

const cx = classNames.bind(styles);

export default function ModalHeader() {
  const { toggleModal } = useModalStore();

  return (
    <header className={cx('header')}>
      <h1 className={cx('title')}>필터링</h1>
      <div className={cx('close')}>
        <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
      </div>
    </header>
  );
}
