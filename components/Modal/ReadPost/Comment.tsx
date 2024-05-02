import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import Image from 'next/image';

import { Comment } from '@/types/Post';
import getReplyList from '@apis/post/getReplyList';
import postCommentLike from '@apis/post/postCommentLike';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Comment.module.scss';
import ProfileContainer from './ProfileContainer';
import ReplyBox from './Reply';

interface CommentProps {
  comment: Comment;
  setReplyInformation: Dispatch<SetStateAction<{ isReply: boolean; targetCommentId: number }>>;
}

export default function CommentContainer({ comment, setReplyInformation }: CommentProps) {
  const [isViewReplyClicked, setIsViewReplyClicked] = useState(false);
  const [replyList, setReplyList] = useState<Comment[]>();

  function handleClickLike() {
    postCommentLike(comment.commentId);
  }

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getReplyList(comment.commentId);
      setReplyList(data.content);
    };

    fetch();
  }, [comment.commentId]);

  return (
    <>
      <ProfileContainer author={comment.author} canDelete={comment.canDelete} commentId={comment.commentId} />
      <div className={styles['content-like-wrapper']}>
        <p className={styles.content}>{comment.content}</p>
        <button type='button' onClick={handleClickLike}>
          <Image src={comment.liked ? filledRedHeart : vacantHeart} alt='heart' width={12} height={12} />
        </button>
      </div>
      <div className={styles['comment-information-container']}>
        <span>{calculateTimePastSinceItCreated(comment.createdDate)}</span>
        <span>좋아요 {comment.likeCount}개</span>
        <button
          type='button'
          onClick={() => {
            setReplyInformation({ isReply: true, targetCommentId: comment.commentId });
          }}
        >
          댓글달기
        </button>
      </div>
      <button type='button' onClick={() => setIsViewReplyClicked(!isViewReplyClicked)}>
        답글 {replyList ? replyList.length : 0}개 보기
      </button>

      {isViewReplyClicked && replyList && replyList.map((reply) => <ReplyBox key={reply.commentId} reply={reply} />)}
    </>
  );
}
