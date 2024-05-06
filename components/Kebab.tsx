/* eslint-disable no-alert */
import postReportComment from '@apis/post/postReportComment';
import postReportPost from '@apis/post/postReportPost';
import { useDeleteComment, useDeletePost } from '@queries/usePostQueries';

import styles from './Kebab.module.scss';

interface KebabProps {
  toggleKebab: () => void;
  isUser: boolean;
  postId?: number;
  commentId?: number;
  replyId?: number;
}

export default function Kebab({ toggleKebab, isUser, commentId, postId, replyId }: KebabProps) {
  const { mutate: deleteCommentMutate } = useDeleteComment(postId, commentId, replyId);

  const { mutate: deletePostMutate } = useDeletePost(postId);

  function handleClickDelete() {
    if (commentId === undefined && replyId === undefined && postId) deletePostMutate(postId);

    if (postId && commentId) deleteCommentMutate(commentId);

    if (commentId && replyId) deleteCommentMutate(replyId);
  }

  async function handleClickReport() {
    if (commentId === undefined && replyId === undefined && postId) {
      const { data } = await postReportPost(postId);

      alert(data);
    }

    if ((postId && commentId) || (commentId && replyId)) {
      const { data } = await postReportComment(commentId);
      alert(data);
    }
  }

  return (
    <>
      <div className={styles['back-drop']} />
      <div className={styles['kebab-container']}>
        <button
          type='button'
          className={styles['kebab-content']}
          onClick={isUser ? handleClickDelete : handleClickReport}
        >
          {isUser ? '삭제하기' : '신고하기'}
        </button>
        <button type='button' className={styles['kebab-cancel']} onClick={toggleKebab}>
          취소하기
        </button>
      </div>
    </>
  );
}
