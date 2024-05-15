import CategoryBox from '@components/CategoryBox';

import styles from './PostItem.module.scss';

export default function PostItem() {
  return (
    <div className={styles.content}>
      <CategoryBox category='HELP' subcategory='ACCOMMODATION' />
      <p className={styles.mention}>content</p>
      <div className={styles.information}>
        <span>닉네임</span>
        <span>3시간전</span>
      </div>
    </div>
  );
}
