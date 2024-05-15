/* eslint-disable no-nested-ternary */

import classNames from 'classnames/bind';

import { Post } from '@/types/Post';
import { useFetchCommentList } from '@queries/usePostQueries';

import CtaComponent from '@components/CtaComponent/CtaComponent';

import CommentedPostItem from './CommentedPostItem';
import styles from '../Post/PostList.module.scss';

const cx = classNames.bind(styles);

interface GetCommentListProps {
  blobId?: string;
}

export default function CommentList({ blobId }: GetCommentListProps) {
  const { data: commentsData, isPending, isError, isFetchingNextPage, ref } = useFetchCommentList(blobId || '');

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div>loading...</div>;
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
        <CtaComponent />
      )}
      {/*  TODO 로딩 인디케이터 추가 */}

      {isFetchingNextPage ? <div>로딩 중...</div> : <div ref={ref} />}
    </div>
  );
}
