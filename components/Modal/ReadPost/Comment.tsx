import { useEffect, useState } from 'react';

import { Comment } from '@/types/Post';
import getReplyList from '@apis/post/getReplyList';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './Comment.module.scss';
import ProfileContainer from './ProfileContainer';
import ReplyBox from './ReplyBox';

interface CommentProps {
  comment: Comment;
}

export default function CommentContainer({ comment }: CommentProps) {
  const [isViewReplyClicked, setIsViewReplyClicked] = useState(false);
  const [replyList, setReplyList] = useState<Comment[]>();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getReplyList(comment.commentId);
      setReplyList(data.content);
    };

    fetch();
  }, []);

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
        답글 {replyList ? replyList.length : 0}개 보기
      </button>

      {isViewReplyClicked && replyList && <ReplyBox replyList={replyList} />}
    </>
  );
}
