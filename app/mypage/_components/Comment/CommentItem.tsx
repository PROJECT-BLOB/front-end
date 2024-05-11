import classNames from 'classnames/bind';

import { Comment } from '@/types/Post';
import BelovedIcon from '@icons/check-heart-white.svg';
import { useFetchTargetPost } from '@queries/usePostQueries';

import CategoryBox from '@components/CategoryBox';
import IconTag from '@components/IconTag/IconTag';
import styles from '@components/Post/PostItem.module.scss';

const cx = classNames.bind(styles);

export default function CommentItem({ comment }: { comment: Comment }) {
  const { data, isPending, isError } = useFetchTargetPost(comment.postId);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const post = data?.data ?? [];

  return (
    <div className={cx('post-container')}>
      <header className={cx('header')}>
        <CategoryBox category={post.category} subcategory={post.subcategory} />
        <IconTag IconSource={BelovedIcon}>Beloved</IconTag>
      </header>
      <main className={cx('main')}>
        <p className={cx('main-text')}>
          <span className={cx('text', 'black', 'large')}>{post?.title}</span>
          <span className={cx('text', 'black', 'middle')}>{comment?.content}</span>
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
