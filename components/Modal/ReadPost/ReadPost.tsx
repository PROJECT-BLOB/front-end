// import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Post } from '@/types/Post';
// import getPost from '@apis/post/getPost';
import closeButton from '@public/icons/x.svg';

import useReadPost from './hooks/useReadPost';
import ImageContainer from './ImageContainer';
import MainContainer from './MainContainer';
import styles from './ReadPost.module.scss';
import Modal from '../Modal';

export const mockContent: Post = {
  postId: 0,
  title: '도쿄타워 화장실',
  content: '화장실 어디있나요 알려주세요 ㅜㅜ',
  category: '도와주세요',
  subcategory: '화장실',
  author: {
    blobId: 'tokyo',
    nickname: 'tokyo',
    profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
  },
  country: '일본',
  city: '도쿄',
  lat: 0,
  lng: 0,
  distFromActual: 0,
  views: 0,
  createdDate: '2024-04-24T12:59:24',
  imageUrl: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
  ],
  liked: true,
  bookmarked: true,
  likeCount: 3,
  commentCount: 2,
  canDelete: true,
}; // useQuery로 데이터 받아옴

export default function ReadPost() {
  const { toggleModal } = useReadPost();
  // const [post, setPost] = useState<Post>(mockContent);

  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await getPost(1);
  //     setPost(data);
  //   };

  //   fetch();
  // }, []);

  return (
    <Modal>
      <Modal.Header>
        <button type='button' onClick={toggleModal} className={styles['close-button']}>
          <Image src={closeButton} alt='close-button' />
        </button>
      </Modal.Header>

      <Modal.Body>
        <section className={styles.main}>
          <ImageContainer contentData={mockContent} />
          <MainContainer contentData={mockContent} />
        </section>
      </Modal.Body>
    </Modal>
  );
}
