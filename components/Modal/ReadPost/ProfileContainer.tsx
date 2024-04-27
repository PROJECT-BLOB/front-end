import Image from 'next/image';

import checkHeart from '@public/icons/check-heart default 24.svg';

import styles from './ProfileContainer.module.scss';
import { AuthorData } from './ReadPost';

interface ProfileContainerProps {
  author: AuthorData;
}

export default function ProfileContainer({ author }: ProfileContainerProps) {
  return (
    <div className={styles['profile-container']}>
      <div className={styles['profile-image-wrapper']}>
        <Image src={author.profileUrl} alt='프로필이미지' fill />
      </div>
      <b className={styles['profile-nickname']}>{author.nickname}</b>
      <div className={styles['like-container']}>
        <Image src={checkHeart} alt='좋아요 아이콘' className='check-heart' />
        <b className={styles['like-count']}>30</b>
      </div>
    </div>
  );
}
