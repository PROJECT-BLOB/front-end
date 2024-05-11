'use client';

import { useFetchTargetPost } from '@queries/usePostQueries';

import ReadPostHeader from '@components/ReadPost/Header/ReadPostHeader';
import MainContainer from '@components/ReadPost/Main/MainContainer';

import styles from './feedPost.module.scss';

interface Param {
  params: { postId: number };
}

export default function FeedPost({ params }: Param) {
  const { data: post } = useFetchTargetPost(params.postId);

  return (
    <div className={styles['feed-post']}>
      <ReadPostHeader isFeed />
      {post && <MainContainer contentData={post.data} isFeed postId={params.postId} />}
    </div>
  );
}
