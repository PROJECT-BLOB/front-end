'use client';

import { useFetchTargetPost } from '@queries/usePostQueries';
import useModalStore from '@stores/useModalStore';

import ReadPostHeader from '@components/ReadPost/Header/ReadPostHeader';
import MainContainer from '@components/ReadPost/Main/MainContainer';

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
