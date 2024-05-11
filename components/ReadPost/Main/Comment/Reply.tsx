import { useState } from 'react';

import Image from 'next/image';

import { Comment } from '@/types/Post';
import updateCommentReport from '@apis/post/updateCommentReport';
import updatePostReport from '@apis/post/updatePostReport';
import kebab from '@public/icons/dots-horizontal.svg';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import { useUpdateReplyLike } from '@queries/usePostQueries';

import Kebab from '@components/Kebab';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Reply.module.scss';
import ProfileContainer from '../ProfileContainer';

interface ReplyProps {
  commentId: number;
  reply: Comment;
}

export default function Reply({ reply, commentId }: ReplyProps) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const { mutate: updateCommentLike } = useUpdateReplyLike(commentId);

  function handleClickLike() {
    updateCommentLike(reply.commentId);
  }

  const toggleKebab = () => {
    setIsKebabClicked(!isKebabClicked);
  };

  async function handleClickReport(isPost: boolean, id: number) {
    if (isPost) {
      await updatePostReport(id);
    } else {
      await updateCommentReport(id);
    }
  }

  return (
    <div key={reply.commentId} className={styles.reply}>
      <div className={styles['profile-and-kebab']}>
        <ProfileContainer author={reply.author} />
        {reply.canDelete && (
          <button type='button' onClick={toggleKebab}>
            <Image src={kebab} alt='케밥버튼' width={16} height={16} />
          </button>
        )}
        {isKebabClicked && <Kebab commentId={reply.commentId} toggleKebab={toggleKebab} />}
      </div>
      <div className={styles['content-like-wrapper']}>
        <p className={styles.content}>{reply.content}</p>
        <button type='button' onClick={handleClickLike}>
          <Image src={reply.liked ? filledRedHeart : vacantHeart} alt='heart' width={12} height={12} />
        </button>
      </div>
      <div className={styles['reply-information-container']}>
        <span>{calculateTimePastSinceItCreated(reply.createdDate)}</span>
        <span>좋아요 {reply.likeCount}개</span>
        {!reply.canDelete && (
          <button className={styles.alert} type='button' onClick={() => handleClickReport(true, reply.commentId)}>
            신고하기
          </button>
        )}
      </div>
    </div>
  );
}
