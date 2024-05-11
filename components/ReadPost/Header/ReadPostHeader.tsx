import { useState } from 'react';

import Image from 'next/image';

import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import info from '@public/icons/info-circle.svg';
import closeButton from '@public/icons/x.svg';
import { useFetchTargetPost, useUpdatePostLike } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import calculateTimeWhenItWillDisappear from '@utils/calculateDisappearTime';

import styles from './ReadPostHeader.module.scss';

export default function ReadPostHeader({ isFeed }: { isFeed?: boolean }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { toggleModal, postId } = useModalStore();

  const { mutate: postLikeMutate } = useUpdatePostLike(postId);

  function handleClickLike() {
    postLikeMutate(post?.data.postId);
  }

  const { data: post } = useFetchTargetPost(postId);

  return (
    <header className={styles['read-header']}>
      <div className={styles['time-blob-and-close']}>
        <div className={styles['time-blob']}>
          <div className={styles['name-and-icon']}>
            <strong className={styles.mention}>Time-Blob</strong>
            <Image
              src={info}
              alt='설명아이콘'
              width={16}
              height={16}
              onMouseEnter={() => setIsMouseEnter(!isMouseEnter)}
              onMouseOut={() => setIsMouseEnter(!isMouseEnter)}
            />
            {/* To Do : 디자인 */}
            {isMouseEnter && <p>시간이 지나면 지도에서 사라집니다.</p>}
          </div>
          <span className={styles['delete-mention']}>
            {calculateTimeWhenItWillDisappear(post?.data.expiresAt)} 남음
          </span>
        </div>
        {isFeed ? (
          ''
        ) : (
          <button type='button' onClick={toggleModal} className={styles['close-button']}>
            <Image src={closeButton} alt='close-button' />
          </button>
        )}
      </div>
      <div className={styles['like-mention-wrapper']}>
        <button type='button' onClick={handleClickLike} className={styles['like-wrapper']}>
          <Image src={post?.data.liked ? filledRedHeart : vacantHeart} alt='좋아요 아이콘' width={20} height={20} />
        </button>
        <p className={styles.mention}>좋아요를 눌러서 지도에 더 오래 남겨보세요.</p>
      </div>
    </header>
  );
}
