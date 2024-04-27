import Image from 'next/image';

import X from '@public/icons/x.svg';

import useReadPost from './hooks/useReadPost';
import ImageContainer from './ImageContainer';
import MainContainer from './MainContainer';
import styles from './ReadPost.module.scss';
import Modal from '../Modal';

export type CategoryType = '추천해요' | '도와주세요' | '궁금해요' | '조심하세요' | '비추천해요';

export interface AuthorData {
  blobId: string;
  nickname: string;
  profileUrl: string;
}

export interface ReadPostData {
  postId: number;
  title: string;
  content: string;
  category: CategoryType;
  subcategory: string;
  author: AuthorData;
  country: string;
  city: string;
  lat: number;
  lng: number;
  distFromActual: number;
  views: number;
  createdDate: string;
  imageUrl: string[];
  liked: boolean;
  bookmarked: boolean;
  likeCount: number;
  commentCount: number;
  canDelete: boolean;
}

export const mockContent: ReadPostData = {
  postId: 0,
  title: 'string',
  content: 'string',
  category: '도와주세요',
  subcategory: 'string',
  author: {
    blobId: 'string',
    nickname: 'string',
    profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
  },
  country: 'string',
  city: 'string',
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
  likeCount: 0,
  commentCount: 0,
  canDelete: true,
}; // useQuery로 데이터 받아옴

export default function ReadPost() {
  const { toggleModal } = useReadPost();

  return (
    <Modal>
      <Modal.Header>
        <button type='button' onClick={toggleModal} className={styles['close-button']}>
          <Image src={X} alt='close-button' />
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
