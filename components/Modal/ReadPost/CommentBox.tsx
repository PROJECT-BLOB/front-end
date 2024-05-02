import { FormEvent, useEffect, useState } from 'react';

import { Comment } from '@/types/Post';
import createComment from '@apis/post/createComment';
import createReply from '@apis/post/creatReply';
import getCommentList from '@apis/post/getCommentList';

import CommentContainer from './Comment';
import styles from './CommentBox.module.scss';

export default function CommentBox({ postId }: { postId: number }) {
  const [commentList, setCommentList] = useState<Comment[]>();
  const [commentInput, setCommentInput] = useState('');
  const [replyInformation, setReplyInformation] = useState({ isReply: false, targetCommentId: 0 });

  function handleSubmitComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // 답글인지 아닌지에 따라 api 호출 다르게 해줌
    replyInformation.isReply
      ? createReply({ commentId: replyInformation.targetCommentId, body: { content: commentInput } })
      : createComment(postId, { content: commentInput });
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getCommentList(postId);
      setCommentList(data.content);
    };

    fetch();
  }, [postId]);

  return (
    <>
      <div className={styles['comment-box']}>
        {commentList?.map((comment) => (
          <CommentContainer key={comment.commentId} comment={comment} setReplyInformation={setReplyInformation} />
        ))}
      </div>

      <form className={styles['comment-form']} onSubmit={handleSubmitComment}>
        <div>
          {replyInformation.isReply && replyInformation.targetCommentId}
          <input
            type='text'
            className={styles['comment-input']}
            placeholder='댓글 남기기'
            onChange={(e) => setCommentInput(e.target.value)}
            value={commentInput}
          />
        </div>
        <button type='submit' className={styles['comment-submit-button']}>
          게시
        </button>
      </form>
    </>
  );
}
