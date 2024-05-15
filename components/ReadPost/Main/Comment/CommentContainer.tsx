import { Dispatch, SetStateAction, useState } from 'react';

import Image from 'next/image';

import { Comment } from '@/types/Post';
import kebab from '@public/icons/dots-horizontal.svg';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import { useFetchTargetCommentReply, useUpdateCommentLike } from '@queries/usePostQueries';

import Kebab from '@components/Kebab';
import useReport from '@components/ReadPost/hooks/useReport';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './CommentContainer.module.scss';
import Reply from './Reply';
import ProfileContainer from '../ProfileContainer';

interface CommentProps {
  comment: Comment;
  setReplyInformation: Dispatch<
    SetStateAction<{ isReply: boolean; targetCommentId: number; targetCommentNickname: string }>
  >;
}

export default function CommentContainer({ comment, setReplyInformation }: CommentProps) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const [isViewReplyClicked, setIsViewReplyClicked] = useState(false);
  const { handleClickReport } = useReport();

  // 답글 조회
  const { data: replyList, fetchNextPage } = useFetchTargetCommentReply(comment.commentId);

  // 댓글 좋아요 시 답글 조회 초기화
  const { mutate: updateCommentLike } = useUpdateCommentLike(comment.postId);

  function handleClickLike() {
    updateCommentLike(comment.commentId);
  }

  const toggleKebab = () => {
    setIsKebabClicked(!isKebabClicked);
  };

  return (
    <div className={styles['comment-container']}>
      <div className={styles['profile-and-kebab']}>
        <ProfileContainer author={comment.author} />
        {comment.canDelete && (
          <button type='button' onClick={toggleKebab}>
            <Image src={kebab} alt='케밥버튼' width={16} height={16} />
          </button>
        )}
        {isKebabClicked && <Kebab postId={comment.postId} commentId={comment.commentId} toggleKebab={toggleKebab} />}
      </div>
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
          className={styles['create-reply']}
        >
          답글달기
        </button>
        {!comment.canDelete && (
          <button className={styles.alert} type='button' onClick={() => handleClickReport(false, comment.commentId)}>
            신고하기
          </button>
        )}
      </div>
      {replyList?.pages[0].data.count ? (
        <button
          type='button'
          onClick={() => setIsViewReplyClicked(!isViewReplyClicked)}
          className={styles['see-reply']}
        >
          <div className={styles.line} />
          답글 보기 ({replyList?.pages[0].data.count}개)
        </button>
      ) : (
        ''
      )}

      {isViewReplyClicked &&
        replyList?.pages[0].data.count !== 0 &&
        replyList?.pages.map((page) =>
          page.data.content.map((reply: Comment) => (
            <Reply key={reply.commentId} reply={reply} commentId={comment.commentId} />
          )),
        )}
      {isViewReplyClicked &&
        (replyList?.pages[replyList.pages.length - 1].data.hasMore ? (
          <button type='button' onClick={() => fetchNextPage()} className={styles['see-more-reply']}>
            <div className={styles.line} />
            답글 ({replyList?.pages[replyList.pages.length - 1].data.remaining})개 더 보기
          </button>
        ) : (
          replyList?.pages[0].data.count !== 0 && (
            <button
              type='button'
              onClick={() => setIsViewReplyClicked(!isViewReplyClicked)}
              className={styles['see-more-reply']}
            >
              <div className={styles.line} />
              답글 숨기기
            </button>
          )
        ))}
    </div>
  );
}
