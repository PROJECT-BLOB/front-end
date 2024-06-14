/* eslint-disable no-nested-ternary */

import classNames from 'classnames/bind';

import { Post } from '@/types/Post';
import { useFetchCommentList } from '@queries/usePostQueries';

import CtaComponent from '@components/CtaComponent/CtaComponent';
import Loading from '@components/Loading/Loading';

import CommentedPostItem from './CommentedPostItem';
import styles from '../Post/PostList.module.scss';

const cx = classNames.bind(styles);

interface GetCommentListProps {
  blobId?: string;
}

export default function CommentList({ blobId }: GetCommentListProps) {
  const { data: commentsData, isPending, isError, isFetchingNextPage, ref } = useFetchCommentList(blobId || '');

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const commentsPages = commentsData?.pages ?? [];

  return (
    <div className={cx('container')}>
      {commentsPages[0]?.data?.content?.length > 0 ? (
        commentsPages.map((commentsPage: { data: { content: Post[] } }) =>
          commentsPage.data.content.map((post: Post) => <CommentedPostItem key={post.postId} commentedPost={post} />),
        )
      ) : (
        <div className={cx('cta-container')}>
          <CtaComponent />
        </div>
      )}

      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
    </div>
  );
}
