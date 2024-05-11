/* eslint-disable no-alert */
import { useDeleteComment, useDeletePost } from '@queries/usePostQueries';

import styles from './Kebab.module.scss';

interface KebabProps {
  toggleKebab: () => void;
  useId?: number;
  postId?: number;
  commentId?: number;
}

export default function Kebab({ toggleKebab, useId, commentId, postId }: KebabProps) {
  const { mutate: deletePostMutate } = useDeletePost(postId, useId);

  const { mutate: deleteCommentMutate } = useDeleteComment(postId, commentId);

  function handleClickDelete() {
    if (postId) deletePostMutate(postId);

    if (commentId) deleteCommentMutate(commentId);

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
