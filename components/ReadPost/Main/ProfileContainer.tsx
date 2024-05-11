import Image from 'next/image';

import { Author } from '@/types/Post';
import checkHeart from '@public/icons/check-heart-pink.svg';

import styles from './ProfileContainer.module.scss';

interface ProfileContainerProps {
  author: Author;
  isLarge?: boolean;
}

export default function ProfileContainer({ author, isLarge }: ProfileContainerProps) {
  return (
    <div className={styles['profile-container']}>
      <div className={`${styles['profile-image-wrapper']} ${isLarge ? styles.large : ''}`}>
        <Image src={author?.profileUrl} alt='프로필이미지' fill />
      </div>
      <b className={`${styles['profile-nickname']} ${isLarge ? styles.large : ''}`}>{author?.nickname}</b>
      <div className={styles['like-container']}>
        <Image src={checkHeart} alt='좋아요 아이콘' height={isLarge ? 20 : 16} width={isLarge ? 20 : 16} />
        <b className={`${styles['like-count']} ${isLarge ? styles.large : ''}`}>Lv. {author?.likedCount}</b>
      </div>
    </div>
  );
}
