'use client';

import { useFetchTargetPost } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import MainContainer from '@components/Modal/ReadPost/Body/Main/MainContainer';
import ReadPostHeader from '@components/Modal/ReadPost/Header/ReadPostHeader';

import styles from './feedPost.module.scss';

export default function FeedPost() {
  const { postId } = useModalStore();
  const { data: post } = useFetchTargetPost(postId);

  return (
    <div className={styles['feed-post']}>
      <ReadPostHeader isFeed />
      {post && <MainContainer contentData={post.data} isFeed />}
    </div>
  );
}
