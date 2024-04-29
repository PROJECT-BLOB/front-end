import Comment from './Comment';
import styles from './CommentBox.module.scss';
import { AuthorData } from './ReadPost';

export interface CommentData {
  id: number;
  content: string;
  author: AuthorData;
  createdDate: string;
  liked: boolean;
  likeCount: number;
  canDelete: boolean;
  reply: string[];
}

const CommentList: CommentData[] = [
  {
    id: 0,
    content: '지하1층에 있어요',
    author: {
      blobId: '1111',
      nickname: '세계여행자',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    },
    createdDate: '2024-04-24T12:59:24',
    liked: true,
    likeCount: 1,
    canDelete: true,
    reply: ['1111', '11111'],
  },
  {
    id: 1,
    content: '나도 급하다',
    author: {
      blobId: '2222',
      nickname: '방랑',
      profileUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    },
    createdDate: '2024-04-24T12:59:24',
    liked: false,
    likeCount: 2,
    canDelete: false,
    reply: ['qwer', 'wertwert'],
  },
];

export default function CommentBox() {
  return (
    <>
      <div className={styles['comment-box']}>
        {CommentList.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
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
