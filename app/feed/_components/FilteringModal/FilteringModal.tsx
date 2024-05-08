import classNames from 'classnames/bind';
import Image from 'next/image';

import CloseButton from '@icons/x-close.svg';
import useModalStore from '@stores/useModalStore';

import styles from './FilteringModal.module.scss';

const cx = classNames.bind(styles);

export default function FilteringModal() {
  const { toggleModal } = useModalStore();

  return (
    <>
      <div className={cx('modal')}>
        <header className={cx('header')}>
          <h1 className={cx('title')}>필터링</h1>
          <div className={cx('close')}>
            <Image src={CloseButton} fill alt='닫기' onClick={toggleModal} />
          </div>
        </header>

        <form className={cx('form')}>
          <section className={cx('category-box')}>
            <h2 className={cx('sub-title')}>카테고리</h2>
          </section>
          <h2 className={cx('sub-title')}>날짜 선택</h2>
          <h2 className={cx('sub-title')}>추가 옵션</h2>
          <button type='button' className={cx('submit')}>
            취소
          </button>
          <button type='submit' className={cx('submit')}>
            완료
          </button>
        </form>
      </div>
    </>
  );
}
