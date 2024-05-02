import deleteComment from '@apis/post/deleteComment';
import deletePost from '@apis/post/deletePost';

import styles from './Kebab.module.scss';

enum CONTENT {
  user = '삭제하기',
  notUser = '신고하기',
}

export default function Kebab({ isUser, commentId, postId }: { isUser: boolean; commentId?: number; postId?: number }) {
  // 신고하기 추가해야댐
  // 로직 추가 필요
  function handleClickDelete() {
    commentId ? deleteComment(commentId) : postId && deletePost(postId);
  }

  return (
    <div className={styles['kebab-container']}>
      <button type='button' className='kebab-content' onClick={handleClickDelete}>
        {isUser ? CONTENT.user : CONTENT.notUser}
      </button>
    </div>
  );
}
