import Image from 'next/image';

import { Author } from '@/types/Post';
import checkHeart from '@public/icons/check-heart-pink.svg';
import dotsHorizontal from '@public/icons/dots-horizontal.svg';

import Kebab from '@components/Kebab';

import useKebabState from './hooks/useKebabState';
import styles from './ProfileContainer.module.scss';

interface ProfileContainerProps {
  postId?: number;
  commentId?: number;
  replyId?: number;
  author: Author;
  canDelete: boolean;
}

export default function ProfileContainer({ postId, commentId, author, canDelete, replyId }: ProfileContainerProps) {
  const { isKebabClicked, toggleKebab } = useKebabState();

  return (
    <section className={styles['profile-kebab-wrapper']}>
      <div className={styles['profile-container']}>
        <div className={styles['profile-image-wrapper']}>
          <Image src={author.profileUrl} alt='프로필이미지' fill />
        </div>
        <b className={styles['profile-nickname']}>{author.nickname}</b>
        <div className={styles['like-container']}>
          <Image src={checkHeart} alt='좋아요 아이콘' />
          <b className={styles['like-count']}>Lv. {author.likedCount}</b>
        </div>
      </div>

      <button type='button' className={styles['kebab-wrapper']}>
        <button type='button' onClick={toggleKebab}>
          <Image src={dotsHorizontal} alt='kebab-icon' />
        </button>
        {isKebabClicked && (
          <Kebab toggleKebab={toggleKebab} isUser={canDelete} postId={postId} commentId={commentId} replyId={replyId} />
        )}
      </button>
    </section>
  );
}
