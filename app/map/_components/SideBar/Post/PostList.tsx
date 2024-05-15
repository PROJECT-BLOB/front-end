import PostItem from './PostItem';
import styles from './PostList.module.scss';

export default function PostList() {
  return (
    <div className={styles['content-list']}>
      <PostItem />
    </div>
  );
}
