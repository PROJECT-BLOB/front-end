import Image from 'next/image';

import { Comment } from '@/types/Post';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import { useUpdateReplyLike } from '@queries/usePostQueries';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Reply.module.scss';
import ProfileContainer from '../ProfileContainer';

interface ReplyProps {
  commentId: number;
  reply: Comment;
}

export default function Reply({ reply, commentId }: ReplyProps) {
  const { mutate: updateCommentLike } = useUpdateReplyLike(commentId);

  function handleClickLike() {
    updateCommentLike(reply.commentId);
  }

  return (
    <div key={reply.commentId} className={styles.reply}>
      <ProfileContainer author={reply.author} />
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
