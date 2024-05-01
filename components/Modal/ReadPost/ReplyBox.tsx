import { Comment } from '@/types/Post';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import ProfileContainer from './ProfileContainer';
import styles from './ReplyBox.module.scss';

interface ReplyProps {
  replyList: Comment[];
}

export default function ReplyBox({ replyList }: ReplyProps) {
  return replyList.map((reply) => (
    <div key={reply.commentId} className={styles.reply}>
      <ProfileContainer author={reply.author} canDelete={reply.canDelete} />
      <p className={styles.content}>{reply.content}</p>
      <div className={styles['reply-information-container']}>
        <span>{calculateTimePastSinceItCreated(reply.createdDate)}</span>
        <span>좋아요 {reply.likeCount}개</span>
      </div>
    </div>
  ));
}
