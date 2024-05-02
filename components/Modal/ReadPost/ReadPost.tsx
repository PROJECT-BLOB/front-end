import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Post } from '@/types/Post';
import getPost from '@apis/post/getPost';
import closeButton from '@public/icons/x.svg';

import useReadPost from './hooks/useReadPost';
import ImageContainer from './ImageContainer';
import MainContainer from './MainContainer';
import styles from './ReadPost.module.scss';
import Modal from '../Modal';

export default function ReadPost() {
  const { toggleModal } = useReadPost();
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetch = async () => {
      // 마커 및 게시글 클릭에 따라 modal에 postId 바꿔서 적용
      const { data } = await getPost(1);
      setPost(data);
    };

    fetch();
  }, []);

  return (
    <Modal>
      <Modal.Header>
        <button type='button' onClick={toggleModal} className={styles['close-button']}>
          <Image src={closeButton} alt='close-button' />
        </button>
      </Modal.Header>

      <Modal.Body>
        <section className={styles.main}>
          {post && (
            <>
              <ImageContainer contentData={post} />
              <MainContainer contentData={post} />
            </>
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
}
