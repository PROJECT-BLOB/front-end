import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Comment } from '@/types/Post';
import { useCreateComment, useCreateReply, useFetchTargetPostComment } from '@queries/usePostQueries';

import styles from './CommentBox.module.scss';
import CommentContainer from './CommentContainer';

export default function CommentBox({ postId }: { postId: number }) {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();

  const [replyInformation, setReplyInformation] = useState({
    isReply: false,
    targetCommentId: 0,
    targetCommentNickname: '',
  });

  // 댓글 조회
  const { data, isPending, isError, isFetchingNextPage, ref } = useFetchTargetPostComment(postId);

  // 댓글 추가 후 댓글 조회 초기화
  const { mutateAsync: createCommentMutate } = useCreateComment(postId);

  // 답글 추가 후 답글 조회 초기화
  const { mutateAsync: createReplyMutate } = useCreateReply(replyInformation.targetCommentId);

  async function handleSubmitComment(formValue: { comment: string }) {
    const { comment } = formValue;
    // 답글인지 아닌지에 따라 api 호출 다르게 해줌
    replyInformation.isReply
      ? await createReplyMutate({ commentId: replyInformation.targetCommentId, body: { content: comment } })
      : await createCommentMutate({ postId, body: { content: comment } });

    // 댓글 입력창 초기화
    reset();
    setReplyInformation({ isReply: false, targetCommentId: 0, targetCommentNickname: '' });
  }

  if (isPending) {
    // TODO 스켈레톤 UI 추가
    return <div className={styles.loading}>loading...</div>;
  }

  if (isError) {
    return <div>데이터 불러오는 중, 에러 발생</div>;
  }

  const commentsPages = data?.pages ?? [];

  return (
    <div>
      <div className={styles['comment-box']}>
        {commentsPages.map((commentsPage) =>
          commentsPage.data.content.map((comment: Comment) => (
            <CommentContainer key={comment.commentId} comment={comment} setReplyInformation={setReplyInformation} />
          )),
        )}
        {/* // TODO 로딩 인디케이터 추가 */}
        {/* // <div ref={ref} />가 화면에 보일 때 fetchNextPage 호출 */}
        {isFetchingNextPage ? <div className={styles.loading}>로딩 중...</div> : <div ref={ref} />}
      </div>

      <form className={styles['comment-form']} onSubmit={handleSubmit(handleSubmitComment)}>
        <div>
          {replyInformation.isReply && (
            <span className={styles['target-nickname']}>@{replyInformation.targetCommentNickname}</span>
          )}
          <input type='text' className={styles['comment-input']} placeholder='댓글 남기기' {...register('comment')} />
        </div>
        <button type='submit' className={styles['comment-submit-button']}>
          게시
        </button>
      </form>
    </div>
  );
}
