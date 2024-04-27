import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import styles from './CommentBox.module.module.scss';
import ProfileContainer from './ProfileContainer';
import { AuthorData } from './ReadPost';

interface CommentData {
  id: number;
  content: string;
  author: AuthorData;
  createdDate: string;
  liked: boolean;
  likeCount: number;
  canDelete: boolean;
  reply: string[];
}

const Comment: CommentData = {
  id: 0,
  content: 'string',
  author: {
    blobId: 'string',
    nickname: 'string',
    profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
  },
  createdDate: '2024-04-24T12:59:24',
  liked: true,
  likeCount: 0,
  canDelete: true,
  reply: ['string', 'strgin'],
};

export default function CommentBox() {
  return (
    <>
      <div className={styles['comment-box']}>
        <ProfileContainer author={Comment.author} />
        <p className={styles.content}>{Comment.content}</p>
        <div className={styles['comment-information-container']}>
          <span>{calculateTimePastSinceItCreated(Comment.createdDate)}</span>
          <span>좋아요 {Comment.likeCount}개</span>
          <button type='button'>댓글달기</button>
        </div>
        <button type='button'>댓글 {Comment.reply.length}개 보기</button>

        {/* 답글 컴포넌트 구현해야함 */}
        <div className={styles.reply}>
          <ProfileContainer author={Comment.author} />
          <p className={styles.content}>{Comment.content}</p>
          <div className={styles['comment-information-container']}>
            <span>{calculateTimePastSinceItCreated(Comment.createdDate)}</span>
            <span>좋아요 {Comment.likeCount}개</span>
          </div>
          <ProfileContainer author={Comment.author} />
          <p className={styles.content}>{Comment.content}</p>
          <div className={styles['comment-information-container']}>
            <span>3시간전</span>
            <span>좋아요 {Comment.likeCount}개</span>
          </div>
        </div>
      </div>

      <form className={styles['comment-form']}>
        <input type='text' className={styles['comment-input']} placeholder='댓글 남기기' />
        <button type='submit' className={styles['comment-submit-button']}>
          게시
        </button>
      </form>
    </>
  );
}
