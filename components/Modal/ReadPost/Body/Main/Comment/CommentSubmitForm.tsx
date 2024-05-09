import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import { useCreateComment, useCreateReply } from '@queries/usePostQueries';

import styles from './CommentSubmitForm.module.scss';

interface CommentSubmitFormProps {
  postId: number;
  replyInformation: {
    isReply: boolean;
    targetCommentId: number;
    targetCommentNickname: string;
  };

  setReplyInformation: Dispatch<
    SetStateAction<{
      isReply: boolean;
      targetCommentId: number;
      targetCommentNickname: string;
    }>
  >;
}

export default function CommentSubmitForm({ postId, replyInformation, setReplyInformation }: CommentSubmitFormProps) {
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();

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

  return (
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
  );
}
