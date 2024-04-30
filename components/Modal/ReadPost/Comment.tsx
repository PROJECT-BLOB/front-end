import { useState } from 'react';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Comment.module.scss';
import { CommentData } from './CommentBox';
import ProfileContainer from './ProfileContainer';
import ReplyBox from './ReplyBox';

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const [isViewReplyClicked, setIsViewReplyClicked] = useState(false);

  return (
    <>
      <ProfileContainer author={comment.author} canDelete={comment.canDelete} />
      <p className={styles.content}>{comment.content}</p>
      <div className={styles['comment-information-container']}>
        <span>{calculateTimePastSinceItCreated(comment.createdDate)}</span>
        <span>좋아요 {comment.likeCount}개</span>
        <button type='button'>댓글달기</button>
      </div>
      <button type='button' onClick={() => setIsViewReplyClicked(!isViewReplyClicked)}>
        답글 {comment.reply.length}개 보기
      </button>

      {isViewReplyClicked && <ReplyBox comment={comment} />}
    </>
  );
}
