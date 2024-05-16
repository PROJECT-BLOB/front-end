/* eslint-disable no-alert */
import { useDeleteComment, useDeletePost } from '@queries/usePostQueries';

import styles from './Kebab.module.scss';

interface KebabProps {
  toggleKebab: () => void;
  blobId?: string;
  postId?: number;
  commentId?: number;
  replyId?: number;
}

export default function Kebab({ toggleKebab, blobId, commentId, postId, replyId }: KebabProps) {
  const { mutate: deletePostMutate } = useDeletePost(postId, blobId);

  const { mutate: deleteCommentMutate } = useDeleteComment(postId, commentId);

  function handleClickDelete() {
    if (postId && blobId) deletePostMutate(postId);

    if (postId && commentId) deleteCommentMutate(commentId);

    if (commentId && replyId) deleteCommentMutate(replyId);

    toggleKebab();
  }

  return (
    <>
      <div className={styles['back-drop']} />
      <div className={styles['kebab-container']}>
        <button type='button' className={styles['kebab-content']} onClick={handleClickDelete}>
          삭제하기
        </button>
        <button type='button' className={styles['kebab-cancel']} onClick={toggleKebab}>
          취소하기
        </button>
      </div>
    </>
  );
}
