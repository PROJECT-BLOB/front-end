import classNames from 'classnames/bind';
import Link from 'next/link';

import { Comment, Post } from '@/types/Post';

import CategoryBox from '@components/CategoryBox';
import IconTag from '@components/IconTag/IconTag';
import styles from '@components/Post/PostItem.module.scss';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

const cx = classNames.bind(styles);

export default function CommentItem({ commentedPost, comment }: { commentedPost: Post; comment: Comment }) {
  return (
    <Link className={cx('post-container')} href={`/feed/${commentedPost.postId}`}>
      <header className={cx('header')}>
        <CategoryBox category={commentedPost?.category} subcategory={commentedPost.subcategory} />
        {commentedPost.likeCount >= 100 && <IconTag>Beloved</IconTag>}
      </header>
      <main className={cx('main-default')}>
        <p className={cx('main-content-default')}>
          <span className={cx('text-black', 'large')}>{commentedPost?.title}</span>
          <span className={cx('text-black', 'middle')}>{comment?.content}</span>
        </p>
      </main>
      <main className={cx('main-mobile')}>
        <span className={cx('text-black', 'large')}>{commentedPost?.title}</span>
        <p className={cx('main-content-mobile')}>
          <span className={cx('text-black', 'middle')}>{comment?.content}</span>
        </p>
      </main>
      <footer className={cx('footer')}>
        <p className={cx('footer-content-gap', 'text', 'gray')}>
          <span>{calculateTimePastSinceItCreated(commentedPost?.createdDate)}</span>
        </p>
      </footer>
    </Link>
  );
}
