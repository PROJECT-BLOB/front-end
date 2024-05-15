import { useState } from 'react';

import { Comment } from '@/types/Post';
import { useFetchTargetPostComment } from '@queries/usePostQueries';

import Loading from '@components/Loading/Loading';

import styles from './CommentBox.module.scss';
import CommentContainer from './CommentContainer';
import CommentSubmitForm from './CommentSubmitForm';

export default function CommentBox({ postId, isFeed }: { postId: number; isFeed: boolean }) {
  const [replyInformation, setReplyInformation] = useState({
    isReply: false,
    targetCommentId: 0,
    targetCommentNickname: '',
  });
  // 댓글 조회
  const { data, isPending, isError, isFetchingNextPage, ref } = useFetchTargetPostComment(postId);

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <Loading />;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const commentsPages = data?.pages ?? [];

  return (
    <div className={styles['comment-box']}>
      {commentsPages.map((commentsPage) =>
        commentsPage.data.content.map((comment: Comment) => (
          <CommentContainer key={comment.commentId} comment={comment} setReplyInformation={setReplyInformation} />
        )),
      )}
      {/* // <div ref={ref} />가 화면에 보일 때 fetchNextPage 호출 */}
      {isFetchingNextPage ? <Loading /> : <div ref={ref} />}
      <div className={`${styles['form-container']} ${isFeed ? styles.feed : ''}`}>
        <CommentSubmitForm
          replyInformation={replyInformation}
          postId={postId}
          setReplyInformation={setReplyInformation}
        />
      </div>
    </div>
  );
}
