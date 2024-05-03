import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';

import { Comment } from '@/types/Post';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import { useFetchTargetCommentReply, useUpdateCommentLike } from '@queries/usePostQueries';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Comment.module.scss';
import ProfileContainer from './ProfileContainer';
import Reply from './Reply';

interface CommentProps {
  comment: Comment;
  setReplyInformation: Dispatch<
    SetStateAction<{ isReply: boolean; targetCommentId: number; targetCommentNickname: string }>
  >;
}

export default function CommentContainer({ comment, setReplyInformation }: CommentProps) {
  const [isViewReplyClicked, setIsViewReplyClicked] = useState(false);

  // 답글 조회
  const { data: replyList } = useFetchTargetCommentReply(comment.commentId);

  // 댓글 좋아요 시 답글 조회 초기화
  const { mutate: updateCommentLike } = useUpdateCommentLike(comment.postId);

  function handleClickLike() {
    updateCommentLike(comment.commentId);
  }

  return (
    <>
      <ProfileContainer
        author={comment.author}
        canDelete={comment.canDelete}
        postId={comment.postId}
        commentId={comment.commentId}
      />
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
            setReplyInformation({
              isReply: true,
              targetCommentId: comment.commentId,
              targetCommentNickname: comment.author.nickname,
            });
          }}
        >
          댓글달기
        </button>
      </div>
      <button type='button' onClick={() => setIsViewReplyClicked(!isViewReplyClicked)}>
        답글 {replyList ? replyList?.data.content.length : 0}개 보기
      </button>

      {isViewReplyClicked &&
        replyList?.data.content &&
        replyList?.data.content.map((reply: Comment) => (
          <Reply key={reply.commentId} reply={reply} commentId={comment.commentId} />
        ))}
    </>
  );
}
