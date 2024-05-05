import Image from 'next/image';

import closeButton from '@public/icons/x.svg';
import { useFetchTargetPost } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import ImageContainer from './ImageContainer';
import MainContainer from './MainContainer';
import styles from './ReadPost.module.scss';

export default function ReadPost() {
  const { toggleModal } = useModalStore();
  const { data: post } = useFetchTargetPost(5);

  return (
    <div className={styles['read-modal']}>
      <div className={styles['read-header']}>
        <button type='button' onClick={toggleModal} className={styles['close-button']}>
          <Image src={closeButton} alt='close-button' />
        </button>
      </div>

      <section className={styles.main}>
        {post?.data && (
          <>
            <ImageContainer contentData={post.data} />
            <MainContainer contentData={post.data} />
          </>
        )}
      </section>
    </div>
  );
}
