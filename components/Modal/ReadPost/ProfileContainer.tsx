import Image from 'next/image';

import checkHeart from '@public/icons/check-heart-pink.svg';
import dotsHorizontal from '@public/icons/dots-horizontal.svg';

import Kebab from '@components/Kebab';

import useReadPost from './hooks/useReadPost';
import styles from './ProfileContainer.module.scss';
import { AuthorData } from './ReadPost';

interface ProfileContainerProps {
  author: AuthorData;
  canDelete: boolean;
}

export default function ProfileContainer({ author, canDelete }: ProfileContainerProps) {
  const { isKebabClicked, toggleKebab } = useReadPost();

  return (
    <section className={styles['profile-kebab-wrapper']}>
      <div className={styles['profile-container']}>
        <div className={styles['profile-image-wrapper']}>
          <Image src={author.profileUrl} alt='프로필이미지' fill />
        </div>
        <b className={styles['profile-nickname']}>{author.nickname}</b>
        <div className={styles['like-container']}>
          <Image src={checkHeart} alt='좋아요 아이콘' />
          <b className={styles['like-count']}>30</b>
          {/* 하트 몇개받았는지 프로필에 받아와야함 */}
        </div>
      </div>

      <button type='button' className={styles['kebab-wrapper']}>
        <button type='button' onClick={toggleKebab}>
          <Image src={dotsHorizontal} alt='kebab-icon' />
        </button>
        {isKebabClicked && <Kebab isUser={canDelete} />}
      </button>
    </section>
  );
}
