import { useState } from 'react';

import { Comment } from '@/types/Post';
import { useFetchTargetPostComment } from '@queries/usePostQueries';

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
    return <div className={styles.loading}>loading...</div>;
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
      {/* // TODO 로딩 인디케이터 추가 */}
      {/* // <div ref={ref} />가 화면에 보일 때 fetchNextPage 호출 */}
      {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
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
