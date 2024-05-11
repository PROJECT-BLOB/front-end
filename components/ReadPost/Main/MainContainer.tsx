import { useRef, useState } from 'react';

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
  isFeed?: boolean;
}

const SCROLL_WIDTH = 264;

export default function MainContainer({ contentData, isFeed }: MainContentProps) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  // 북마크 한 후 게시글 조회 초기화 - 이러면 조회수 올라가서 다르게 해줘야할듯
  const { mutate: postBookmarkMutate } = useUpdatePostBookmark(contentData.postId);

  function handleClickBookmark() {
    postBookmarkMutate(contentData.postId);
  }

  // 신고
  function handleClickReport(isPost: boolean, id: number) {
    if (isPost) {
      updatePostReport(id);
    } else {
      updateCommentReport(id);
    }
  }

  const toggleKebab = () => {
    setIsKebabClicked(!isKebabClicked);
  };

  function handleSlideLeft() {
    const imageContainer = imageContainerRef.current;

    imageContainer?.scrollTo({
      left: imageContainer.scrollLeft - SCROLL_WIDTH,
      behavior: 'smooth',
    });
  }

  function handleSlideRight() {
    const imageContainer = imageContainerRef.current;

    imageContainer?.scrollTo({
      left: imageContainer.scrollLeft + SCROLL_WIDTH,
      behavior: 'smooth',
    });
  }

  return (
    <section className={`${styles['main-container']} ${isFeed && styles.feed}`}>
      <div>
        <div className={styles['profile-and-kebab']}>
          <ProfileContainer author={contentData.author} isLarge />
          {contentData.canDelete && (
            <button type='button' onClick={toggleKebab}>
              <Image src={kebab} alt='케밥버튼' width={24} height={24} />
            </button>
          )}
          {isKebabClicked && (
            <Kebab useId={contentData.author.userId} postId={contentData.postId} toggleKebab={toggleKebab} />
          )}
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

        {/* 이미지 슬라이드랑 확대모달 구현 해야함 */}
        <p className={styles.content}>{contentData.content}</p>
        {isFeed && (
          <div className={styles['image-list-container']} ref={imageContainerRef}>
            {contentData.imageUrl.map((image) => (
              <div key={image} className={styles['image-container']}>
                <Image src={image} alt='image' fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}
        {contentData.imageUrl.length !== 0 && isFeed && (
          <div className={styles['slider-button-container']}>
            <button type='button' onClick={handleSlideLeft} className={styles['image-slider-left-button']}>
              &lt;
            </button>
            <button type='button' onClick={handleSlideRight} className={styles['image-slider-right-button']}>
              &gt;
            </button>
          </div>
        )}

        {/* 이미지 클릭했을때 처리해줘야함 */}
        {/* <div className={styles['image-modal']}>
          <ImageContainer contentData={contentData} />
        </div> */}
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
