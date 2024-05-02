import Image from 'next/image';

import { Comment } from '@/types/Post';
import postCommentLike from '@apis/post/postCommentLike';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import ProfileContainer from './ProfileContainer';
import styles from './Reply.module.scss';

interface ReplyProps {
  reply: Comment;
}

export default function Reply({ reply }: ReplyProps) {
  function handleClickLike() {
    postCommentLike(reply.commentId);
  }

  return (
    <div key={reply.commentId} className={styles.reply}>
      <ProfileContainer author={reply.author} canDelete={reply.canDelete} commentId={reply.commentId} />
      <div className={styles['content-like-wrapper']}>
        <p className={styles.content}>{reply.content}</p>
        <button type='button' onClick={handleClickLike}>
          <Image src={reply.liked ? filledRedHeart : vacantHeart} alt='heart' width={12} height={12} />
        </button>
      </div>
      <div className={styles['reply-information-container']}>
        <span>{calculateTimePastSinceItCreated(reply.createdDate)}</span>
        <span>좋아요 {reply.likeCount}개</span>
      </div>
    </div>
  );
}
