'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { UserDetail } from '@/types/User';
import { useDetailQueries } from '@queries/useUserQueries';
import { Post } from 'types/Post';

import PostList from './_components/Post/PostList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

const mockContent: Post[] = [
  {
    postId: 0,
    title: '도쿄타워 화장실',
    content: '화장실 어디있나요 알려주세요 ㅜㅜ',
    category: '도와주세요',
    subcategory: '화장실',
    author: {
      blobId: 'tokyo',
      nickname: 'tokyo',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
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
  },
  {
    postId: 0,
    title: '도쿄타워 화장실',
    content: '화장실 어디있나요 알려주세요 ㅜㅜ',
    category: '도와주세요',
    subcategory: '화장실',
    author: {
      blobId: 'tokyo',
      nickname: 'tokyo',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
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
  },
];

export default function myPage() {
  // TODO: 쿼리에서 유저 정보 가져오기

  const [userData, setUserData] = useState<UserDetail | null>(null);
  // TODO: useQuery로 posts 가져옴
  // const [postsData, setPostsData] = useState<Post[] | null>(null);
  const router = useRouter();

  const { data } = useDetailQueries('0503'); // 임시로 아이디 넣음
  // isLoading, isError, error - 린트에러 때문에 지움
  useEffect(() => {
    if (data) {
      // 데이터가 있을 때만 상태를 업데이트함
      setUserData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (!userData) return;

    const blobId = userData?.blobId;

    // TODO: 로그인 안 되어있으면 로그인 페이지로 이동-임시, 수정필요
    if (!blobId) {
      router.push('/signin');
    }
  }, [userData, router]);

  return (
    <>
      <header>HEADER-나중에 들어감</header>
      <section>
        <UserProfile userData={userData} />
      </section>
      <section className={cx('tabs')}>탭 들어감</section>
      <section className={cx('post-list')}>
        <PostList postList={mockContent} />
      </section>
    </>
  );
}
