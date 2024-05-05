'use client';

import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';

import { UserDetail } from '@/types/User';
import { useDetailQueries } from '@queries/useUserQueries';
import { useUserStore } from '@stores/userStore';
import { Post } from 'types/Post';

import Tab from '@components/Tab';

import PostList from './_components/Post/PostList';
import UserProfile from './_components/UserProfile/UserProfile';
import styles from './myPage.module.scss';

const cx = classNames.bind(styles);

const mockContent: Post[] = [
  {
    postId: 0,
    title: '도쿄타워 화장실',
    content: '화장실 어디있나요 알려주세요 ㅜㅜ',
    category: 'HELP',
    subcategory: '화장실',
    author: {
      userId: 1,
      blobId: 'tokyo',
      nickname: 'tokyo',
      likedCount: 0,
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    },
    expiresAt: '2024-05-05T14:46:19',
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
    postId: 1,
    title: '도쿄타워 화장실',
    content: '화장실 어디있나요 알려주세요 ㅜㅜ',
    category: 'HELP',
    subcategory: '화장실',
    author: {
      userId: 2,
      blobId: 'tokyo',
      nickname: 'tokyo',
      likedCount: 0,
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    },
    expiresAt: '2024-05-05T14:46:19',
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
  // TODO: 유저 정보 가져오기
  const { userId, isSignin } = useUserStore();

  const [userData, setUserData] = useState<UserDetail | null>(null);
  // TODO: posts 가져오기
  // const [postsData, setPostsData] = useState<Post[] | null>(null);
  const router = useRouter();

  const { data, isLoading, isError, error } = useDetailQueries(userId);

  useEffect(() => {
    if (data) {
      // 데이터가 있을 때만 상태를 업데이트함
      setUserData(data.data);
    }
  }, [data]);

  useEffect(() => {
    // if (!userData) return;

    if (!isSignin) {
      router.push('/signin');
    }
  }, [isSignin, router]);

  if (isLoading) return <div>로딩중...</div>;

  if (isError) return <div>에러 발생: {error.toString()}</div>;

  return (
    <div className={cx('wrappper')}>
      <section>
        <UserProfile userData={userData} />
      </section>
      <section className={cx('tabs')}>
        <Tab focused>내가 쓴 글</Tab>
        <Tab focused={false}>저장한 글</Tab>
        <Tab focused={false}>댓글 단 글</Tab>
      </section>
      <section className={cx('post-list')}>
        <PostList postList={mockContent} />
      </section>
    </div>
  );
}
