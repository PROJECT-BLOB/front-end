import { useState } from 'react';

import styles from './Order.module.scss';

export default function Order() {
  const [isClicked, setIsClicked] = useState({ recent: true, hot: false });

  return (
    <div className={styles['order-wrapper']}>
      <button
        className={`${styles['order-mention']} ${isClicked.recent ? styles.active : ''} `}
        type='button'
        onClick={() => setIsClicked(() => ({ recent: true, hot: false }))}
      >
        최신순
      </button>
      <span className={styles['order-mention']}>|</span>
      <button
        className={`${styles['order-mention']} ${isClicked.hot ? styles.active : ''} `}
        type='button'
        onClick={() => setIsClicked(() => ({ recent: false, hot: true }))}
      >
        인기순
      </button>
    </div>
  );
}
