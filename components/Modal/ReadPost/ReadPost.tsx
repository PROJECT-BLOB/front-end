import ReadPostBody from './Body/ReadPostBody';
import ReadPostHeader from './Header/ReadPostHeader';
import styles from './ReadPost.module.scss';

export default function ReadPost() {
  return (
    <main className={styles['read-modal']}>
      <ReadPostHeader />
      <ReadPostBody />
    </main>
  );
}
