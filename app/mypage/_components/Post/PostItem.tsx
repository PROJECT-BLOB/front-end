import Image from 'next/image';

import HeartIcon from '@/public/icons/heart.svg';
import CommentIcon from '@/public/icons/message-circle-02.svg';
import { Post } from '@/types/Post';

import CategoryBox from '@components/CategoryBox';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './PostItem.module.scss';

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className={styles['post-container']}>
      <header className={styles.header}>
        <CategoryBox category={post.category} subcategory={post.subcategory} />
        <span className={`${styles.text}`}>beloved 태그 보류</span>
      </header>
      <main className={styles.main}>
        <p className={`${styles['main-text']} ${styles.text} ${styles.black} ${styles.large}`}>
          <span>{post?.title}</span>
          <span className={`${styles.text} ${styles.black} ${styles.middle}`}>{post?.content}</span>
        </p>
        <span className={styles.photo}>
          <Image fill src={post?.imageUrl[0]} alt='메인 이미지' />
        </span>
      </main>
      <footer className={styles.footer}>
        <p className={`${styles['footer-content-gap']} ${styles.text} ${styles.gray}`}>
          <span>{post?.author?.nickname}</span>
          <span>{calculateTimePastSinceItCreated(post.createdDate)}</span>
        </p>
        <p className={styles['footer-content-gap']}>
          <span className={styles['icon-box']}>
            <Image className={styles.icon} src={HeartIcon} alt='좋아요 아이콘' />
            <span className={`${styles.text} ${styles.black} ${styles.small}`}>{post.likeCount}개</span>
          </span>
          <span className={styles['icon-box']}>
            <Image className={styles.icon} src={CommentIcon} alt='댓글 아이콘' />
            <span className={`${styles.text} ${styles.black} ${styles.small}`}>{post.commentCount}개</span>
          </span>
        </p>
      </footer>
    </div>
  );
}
