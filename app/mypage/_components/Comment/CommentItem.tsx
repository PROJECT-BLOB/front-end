import classNames from 'classnames/bind';

import { Comment } from '@/types/Post';

import CategoryBox from '@components/CategoryBox';

import styles from '../Post/PostItem.module.scss';

const cx = classNames.bind(styles);

export default function PostItem({ post }: { post: Comment }) {
  return (
    <div className={cx('post-container')}>
      <header className={cx('header')}>
        {/* // TODO: 해당 post category도 담겨있어야 함 */}
        {/* // TODO: 임시 */}
        <CategoryBox category={'HELP'} subcategory='asd' />
        <span>beloved 태그 보류</span>
      </header>
      <main className={cx('main')}>
        <p className={cx('main-text')}>
          {/* // TODO: 해당 post title도 담겨있어야 함 */}
          <span className={cx('text', 'black', 'large')}>{post?.postId}</span>
          <span className={cx('text', 'black', 'middle')}>{post?.content}</span>
        </p>
      </main>
      <footer className={cx('footer')}>
        <p className={cx('footer-content-gap', 'text', 'gray')}>
          <span>3시간 전</span>
        </p>
      </footer>
    </div>
  );
}
