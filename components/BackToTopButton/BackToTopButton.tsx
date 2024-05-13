import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import Image from 'next/image';

import ChevronLarge from '@icons/chevron-up-double-large.svg';
import ChevronSmall from '@icons/chevron-up-double-small.svg';

import styles from './BackToTopButton.module.scss';

const cx = classNames.bind(styles);

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.scrollY > 400) {
        setShowButton(true);
      } else if (showButton && window.scrollY <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);

    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <p className={cx('button-container', showButton ? 'show' : 'hide')}>
      <span className={cx('icon-small')}>
        <Image fill src={ChevronSmall} onClick={scrollToTop} alt='위로 가기 아이콘' />
      </span>
      <span className={cx('icon-large')}>
        <Image fill src={ChevronLarge} onClick={scrollToTop} alt='위로 가기 아이콘' />
      </span>
      <span className={cx('text')}>Back to Top</span>
    </p>
  );
}
