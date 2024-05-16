import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import x from '@public/icons/x-square.svg';
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
      {replyInformation.isReply && (
        <div className={styles['target-nickname']}>
          <span>@{replyInformation.targetCommentNickname}</span>
          <button
            type='button'
            className={styles['cancel-button']}
            onClick={() => setReplyInformation({ ...replyInformation, isReply: false })}
          >
            <Image src={x} alt='x' width={14} height={14} />
          </button>
        </div>
      )}
      <input type='text' className={styles['comment-input']} placeholder='댓글 남기기' {...register('comment')} />
      <button type='submit' className={styles['comment-submit-button']}>
        게시
      </button>
    </form>
  );
}
