import { useState } from 'react';

import Image from 'next/image';

import { Post } from '@/types/Post';
import updateCommentReport from '@apis/post/updateCommentReport';
import updatePostReport from '@apis/post/updatePostReport';
import bookmark from '@public/icons/bookmark.svg';
import verifiedIcon from '@public/icons/check-verified-blue.svg';
import kebab from '@public/icons/dots-horizontal.svg';
import filledBookmark from '@public/icons/filled-bookmark.svg';
import { useUpdatePostBookmark } from '@queries/usePostQueries';

import CategoryBox from '@components/CategoryBox';
import Kebab from '@components/Kebab';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import CommentBox from './Comment/CommentBox';
import styles from './MainContainer.module.scss';
import ProfileContainer from './ProfileContainer';

interface MainContentProps {
  contentData: Post;
}

export default function MainContainer({ contentData }: MainContentProps) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  // 북마크 한 후 게시글 조회 초기화 - 이러면 조회수 올라가서 다르게 해줘야할듯
  const { mutate: postBookmarkMutate } = useUpdatePostBookmark(contentData.postId);

  function handleClickBookmark() {
    postBookmarkMutate(contentData.postId);
  }

  // 신고
  async function handleClickReport(isPost: boolean, id: number) {
    if (isPost) {
      await updatePostReport(id);
    } else {
      await updateCommentReport(id);
    }
  }

  const toggleKebab = () => {
    setIsKebabClicked(!isKebabClicked);
  };

  return (
    <section className={styles['main-container']}>
      <div>
        <div className={styles['profile-and-kebab']}>
          <ProfileContainer author={contentData.author} isLarge />
          {contentData.canDelete && (
            <button type='button' onClick={toggleKebab}>
              <Image src={kebab} alt='케밥버튼' width={24} height={24} />
            </button>
          )}
          {isKebabClicked && <Kebab postId={contentData.postId} toggleKebab={toggleKebab} />}
        </div>
        <CategoryBox category={contentData.category} subcategory={contentData.subcategory} />

        <div className={styles['title-wrapper']}>
          <div className={styles['title-and-distance']}>
            <h3 className={styles.title}>{contentData.title}</h3>
            <div className={styles.distance}>
              <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
              <strong>{contentData.distFromActual}m 이내 작성됨</strong>
            </div>
          </div>
          {!contentData.canDelete && (
            <button type='button' onClick={handleClickBookmark}>
              <Image
                src={contentData.bookmarked ? filledBookmark : bookmark}
                alt='북마크 아이콘'
                width={24}
                height={24}
              />
            </button>
          )}
        </div>

        <p className={styles.content}>{contentData.content}</p>
        <div className={styles['time-and-city']}>
          <p className={styles['time-ago']}>{calculateTimePastSinceItCreated(contentData.createdDate)}</p>
          <p className={styles.city}>
            {contentData.country} {contentData.city}
          </p>
        </div>

        <div className={styles['content-info']}>
          <p>조회수 {contentData.views}회</p>
          <p>좋아요 {contentData.likeCount}개</p>
          <p>댓글 {contentData.commentCount}개</p>
          {!contentData.canDelete && (
            <button className={styles.alert} type='button' onClick={() => handleClickReport(true, contentData.postId)}>
              신고하기
            </button>
          )}
        </div>
      </div>
      <p className={styles['comment-line']}>댓글</p>
      <CommentBox postId={contentData.postId} />
    </section>
  );
}
