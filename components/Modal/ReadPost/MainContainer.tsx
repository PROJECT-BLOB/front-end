import Image from 'next/image';

import { Post } from '@/types/Post';
import bookmark from '@public/icons/bookmark.svg';
import verifiedIcon from '@public/icons/check-verified-blue.svg';
import filledBookmark from '@public/icons/filled-bookmark.svg';
import filledRedHeart from '@public/icons/filled-red-heart.svg';
import vacantHeart from '@public/icons/heart.svg';
import { useUpdatePostBookmark, useUpdatePostLike } from '@queries/usePostQueries';

import CategoryBox from '@components/CategoryBox';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import CommentBox from './CommentBox';
import styles from './MainContainer.module.scss';
import ProfileContainer from './ProfileContainer';

interface MainContentProps {
  contentData: Post;
}

export default function MainContainer({ contentData }: MainContentProps) {
  // 북마크 한 후 게시글 조회 초기화 - 이러면 조회수 올라가서 다르게 해줘야할듯
  const { mutate: postBookmarkMutate } = useUpdatePostBookmark(contentData.postId);

  // 마찬가지
  const { mutate: postLikeMutate } = useUpdatePostLike(contentData.postId);

  function handleClickBookmark() {
    postBookmarkMutate(contentData.postId);
  }

  function handleClickLike() {
    postLikeMutate(contentData.postId);
  }

  return (
    <section className={styles['main-container']}>
      <div className={styles['like-delete-bookmark-container']}>
        <div className={styles['like-delete-wrapper']}>
          <button type='button' onClick={handleClickLike} className={styles['like-wrapper']}>
            <Image src={contentData.liked ? filledRedHeart : vacantHeart} alt='좋아요 아이콘' width={24} height={24} />
          </button>
          <span className={styles['delete-mention']}>이 글은 21시간 38분 31초 이후 삭제됩니다.</span>
          {/* 맵에서 사라지는거 받아야 함 */}
        </div>
        <button type='button' onClick={handleClickBookmark}>
          <Image src={contentData.bookmarked ? filledBookmark : bookmark} alt='북마크 아이콘' width={24} height={24} />
        </button>
      </div>

      <ProfileContainer author={contentData.author} canDelete={contentData.canDelete} postId={contentData.postId} />

      <div className={styles.distance}>
        <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
        <strong>{contentData.distFromActual}m 이내 작성됨</strong>
      </div>

      <p className={styles.city}>
        {contentData.country} {contentData.city}
      </p>

      <CategoryBox contentData={contentData} />

      <h3 className={styles.title}>{contentData.title}</h3>
      <p className={styles.content}>{contentData.content}</p>
      <p className={styles['time-ago']}>{calculateTimePastSinceItCreated(contentData.createdDate)}</p>

      <div className={styles['content-info']}>
        <p>조회수 {contentData.views}회</p>
        <p>좋아요 {contentData.likeCount}개</p>
        <p>댓글 {contentData.commentCount}개</p>
      </div>

      <CommentBox postId={contentData.postId} />
    </section>
  );
}
