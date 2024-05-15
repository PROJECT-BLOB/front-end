import CtaComponent from '@components/CtaComponent/CtaComponent';

import styles from './PostList.module.scss';

export default function PostList() {
  return (
    <div className={styles['content-list']}>
      <CtaComponent title='작성된 글이 없습니다.' />
    </div>
  );
}
