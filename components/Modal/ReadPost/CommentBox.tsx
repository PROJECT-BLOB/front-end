import { useEffect, useState } from 'react';

import { Comment } from '@/types/Post';
import getCommentList from '@apis/post/getCommentList';

import CommentContainer from './Comment';
import styles from './CommentBox.module.scss';

export default function CommentBox() {
  const [commentList, setCommentList] = useState<Comment[]>();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getCommentList(1);
      setCommentList(data.content);
    };

    fetch();
  }, []);

  return (
    <>
      <div className={styles['comment-box']}>
        {commentList?.map((comment) => <CommentContainer key={comment.commentId} comment={comment} />)}
      </div>

      <form className={styles['comment-form']}>
        <input type='text' className={styles['comment-input']} placeholder='댓글 남기기' />
        <button type='submit' className={styles['comment-submit-button']}>
          게시
        </button>
      </form>
    </>
  );
}
