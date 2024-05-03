import { useDeleteComment, useDeletePost } from '@queries/usePostQueries';

import styles from './Kebab.module.scss';

enum CONTENT {
  user = '삭제하기',
  notUser = '신고하기',
}

interface KebabProps {
  isUser: boolean;
  postId?: number;
  commentId?: number;
  replyId?: number;
}

export default function Kebab({ isUser, commentId, postId, replyId }: KebabProps) {
  // 신고하기 추가해야댐
  // 포스트면 포스트아이디만
  // 댓글이면 댓글이랑 포스트
  // 답글이면 답글이랑 댓글

  const { mutate: deleteCommentMutate } = useDeleteComment(postId, commentId, replyId);

  const { mutate: deletePostMutate } = useDeletePost(postId);

  function handleClickDelete() {
    if (commentId === undefined && replyId === undefined && postId) deletePostMutate(postId);

    if (postId && commentId) deleteCommentMutate(commentId);

    if (commentId && replyId) deleteCommentMutate(replyId);
  }

  return (
    <div className={styles['kebab-container']}>
      <button type='button' className='kebab-content' onClick={handleClickDelete}>
        {isUser ? CONTENT.user : CONTENT.notUser}
      </button>
    </div>
  );
}
