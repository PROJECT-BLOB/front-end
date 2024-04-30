import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import { CommentData } from './CommentBox';
import ProfileContainer from './ProfileContainer';
import styles from './ReplyBox.module.scss';

interface ReplyProps {
  comment: CommentData;
}

// 답글 받아오는거 있어야 함
export default function ReplyBox({ comment }: ReplyProps) {
  return (
    <div className={styles.reply}>
      <ProfileContainer author={comment.author} canDelete={comment.canDelete} />
      <p className={styles.content}>{comment.content}</p>
      <div className={styles['comment-information-container']}>
        <span>{calculateTimePastSinceItCreated(comment.createdDate)}</span>
        <span>좋아요 {comment.likeCount}개</span>
      </div>
      <ProfileContainer author={comment.author} canDelete={comment.canDelete} />
      <p className={styles.content}>{comment.content}</p>
      <div className={styles['comment-information-container']}>
        <span>3시간전</span>
        <span>좋아요 {comment.likeCount}개</span>
      </div>
    </div>
  );
}
