import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Author } from '@/types/Post';
import DefaultImage from '@images/default-user-image.svg';
import checkHeart from '@public/icons/check-heart-pink.svg';

import styles from './ProfileContainer.module.scss';

interface ProfileContainerProps {
  author: Author;
  isLarge?: boolean;
}

export default function ProfileContainer({ author, isLarge }: ProfileContainerProps) {
  const router = useRouter();

  function handleClickProfile(blobId: string | undefined) {
    if (blobId) router.push(`/user/${blobId}`);
  }

  return (
    <div className={styles['profile-container']}>
      <button
        type='button'
        className={`${styles['profile-image-wrapper']} ${isLarge ? styles.large : ''}`}
        onClick={() => handleClickProfile(author?.blobId)}
        disabled={!author?.blobId}
      >
        <Image src={author?.profileUrl || DefaultImage} alt='프로필이미지' fill />
      </button>

      <b className={`${styles['profile-nickname']} ${isLarge ? styles.large : ''}`}>
        {author?.nickname || '탈퇴한 유저'}
      </b>
      <div className={styles['like-container']}>
        <Image src={checkHeart} alt='좋아요 아이콘' height={isLarge ? 20 : 16} width={isLarge ? 20 : 16} />
        <b className={`${styles['like-count']} ${isLarge ? styles.large : ''}`}>Lv. {author?.likedCount}</b>
      </div>
    </div>
  );
}
