import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';

import { Post } from '@/types/Post';
import BelovedIcon from '@icons/check-heart-white.svg';
import HeartIcon from '@icons/heart.svg';
import CommentIcon from '@icons/message-circle-02.svg';
import useModalStore from '@stores/useModalStore';

import CategoryBox from '@components/CategoryBox';
import IconTag from '@components/IconTag/IconTag';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './PostItem.module.scss';

const cx = classNames.bind(styles);

export default function PostItem({ post }: { post: Post }) {
  const { setCurrentName, setPostId } = useModalStore();

  function handleClickPost(postId: number) {
    setCurrentName('read');
    setPostId(postId);
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <Link className={cx('post-container')} href={`/feed/${post.postId}`} onClick={() => handleClickPost(post.postId)}>
      <header className={cx('header')}>
        <CategoryBox category={post.category} subcategory={post.subcategory} />
        {post.likeCount >= 100 && <IconTag IconSource={BelovedIcon}>Beloved</IconTag>}
      </header>
      <main className={cx('main-mobile')}>
        <span className={cx('text-black', 'large')}>{post?.title}</span>
        <section className={cx('main-content-mobile')}>
          <span className={cx('text-black', 'middle')}>{post?.content}</span>
          {post?.imageUrl.length > 0 && (
            <div className={cx('photo-container')}>
              <Image fill style={{ objectFit: 'cover' }} src={post?.imageUrl[0]} alt='메인 이미지' />
            </div>
          )}
        </section>
      </main>
      <main className={cx('main-default')}>
        <p className={cx('main-content-default')}>
          <span className={cx('text-black', 'large')}>{post?.title}</span>
          <span className={cx('text-black', 'middle')}>{post?.content}</span>
        </p>
        {post?.imageUrl.length > 0 && (
          <span className={cx('photo-container')}>
            <Image fill style={{ objectFit: 'cover' }} src={post?.imageUrl[0]} alt='메인 이미지' />
          </span>
        )}
      </main>
      <footer className={cx('footer')}>
        <p className={cx('footer-content-gap', 'text-gray')}>
          <span>{post?.author?.nickname}</span>
          <span>{calculateTimePastSinceItCreated(post.createdDate)}</span>
          {/* //TODO: 위치  추가 */}
          <span>{`${post.country} ${post.city}`}</span>
        </p>
        <p className={cx('footer-content-gap')}>
          <span className={cx('icon-box')}>
            <Image className={cx('icon')} src={HeartIcon} alt='좋아요 아이콘' />
            <span className={cx('text-black', 'small')}>{post.likeCount}개</span>
          </span>
          <span className={cx('icon-box')}>
            <Image className={cx('icon')} src={CommentIcon} alt='댓글 아이콘' />
            <span className={cx('text-black', 'small')}>{post.commentCount}개</span>
          </span>
        </p>
      </footer>
    </Link>
  );
}
