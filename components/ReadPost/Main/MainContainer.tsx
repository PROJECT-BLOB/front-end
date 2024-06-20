import { useRef, useState } from 'react';

import Image from 'next/image';

import { Post } from '@/types/Post';
import arrowLeft from '@public/icons/arrow-left.svg';
import arrowRight from '@public/icons/arrow-right.svg';
import bookmark from '@public/icons/bookmark.svg';
import verifiedIcon from '@public/icons/check-verified-blue.svg';
import closeImageButton from '@public/icons/close-button.svg';
import kebab from '@public/icons/dots-horizontal.svg';
import filledBookmark from '@public/icons/filled-bookmark.svg';
import { useUpdatePostBookmark } from '@queries/usePostQueries';

import CategoryBox from '@components/CategoryBox';
import Kebab from '@components/Kebab';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import CommentBox from './Comment/CommentBox';
import styles from './MainContainer.module.scss';
import ProfileContainer from './ProfileContainer';
import useImageControl from '../hooks/useImageControl';
import useReport from '../hooks/useReport';

interface MainContentProps {
  contentData: Post;
  isFeed?: boolean;
  postId: number;
}

const SCROLL_WIDTH = 264;

export default function MainContainer({ contentData, isFeed = false, postId }: MainContentProps) {
  const [isKebabClicked, setIsKebabClicked] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const { handleClickReport } = useReport();

  const { currentImageIndex, handlePreviousImage, handleNextImage, setCurrentImageIndex } = useImageControl(
    contentData.imageUrl,
  );

  // 북마크 한 후 게시글 조회 초기화 - 이러면 조회수 올라가서 다르게 해줘야할듯
  const { mutate: postBookmarkMutate } = useUpdatePostBookmark(postId);

  function handleClickBookmark() {
    postBookmarkMutate(contentData.postId);
  }

  const toggleKebab = () => {
    setIsKebabClicked(!isKebabClicked);
  };

  // 왼쪽으로 지정해준 width 만큼 슬라이드
  function handleSlideLeft() {
    const imageContainer = imageContainerRef.current;

    imageContainer?.scrollTo({
      left: imageContainer.scrollLeft - SCROLL_WIDTH,
      behavior: 'smooth',
    });
  }

  // 오른쪽으로 지정해준 width 만큼 슬라이드
  function handleSlideRight() {
    const imageContainer = imageContainerRef.current;

    imageContainer?.scrollTo({
      left: imageContainer.scrollLeft + SCROLL_WIDTH,
      behavior: 'smooth',
    });
  }

  function handleClickImage(index: number) {
    setCurrentImageIndex(index);
    setIsImageClicked(!isImageClicked);
  }

  if (isImageClicked) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section className={`${styles['main-container']} ${isFeed && styles.feed}`}>
      {/* 이미지 클릭시 확대된 이미지 */}
      {isImageClicked && (
        <div className={styles.overlay}>
          <Image src={contentData.imageUrl[currentImageIndex]} className={styles.image} alt='이미지' fill />
          <button type='button' onClick={() => setIsImageClicked(!isImageClicked)} className={styles['close-image']}>
            <Image src={closeImageButton} alt='close-button' width={12} height={12} />
          </button>
          <button type='button' onClick={handlePreviousImage} className={styles['image-big-slider-left-button']}>
            <Image src={arrowLeft} alt='arrow-left' />
          </button>
          <button type='button' onClick={handleNextImage} className={styles['image-big-slider-right-button']}>
            <Image src={arrowRight} alt='arrow-right' />
          </button>
        </div>
      )}
      <div>
        <div className={styles['profile-and-kebab']}>
          <ProfileContainer author={contentData.author} isLarge />
          {contentData.canDelete && (
            <button type='button' onClick={toggleKebab}>
              <Image src={kebab} alt='케밥버튼' width={24} height={24} />
            </button>
          )}
          {isKebabClicked && (
            <Kebab
              isFeed={isFeed}
              blobId={contentData.author.blobId}
              postId={contentData.postId}
              toggleKebab={toggleKebab}
            />
          )}
        </div>
        <CategoryBox category={contentData.category} subcategory={contentData.subcategory} />

        <div className={styles['title-wrapper']}>
          <div className={styles['title-and-distance']}>
            <h3 className={styles.title}>{contentData.title}</h3>
            {contentData.distFromActual && (
              <div className={styles.distance}>
                <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
                <strong>{contentData.distFromActual}m 이내 작성됨</strong>
              </div>
            )}
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
        {isFeed && (
          <div className={styles['image-list-container']} ref={imageContainerRef}>
            {contentData.imageUrl.map((image, index) => (
              <button
                type='button'
                key={image}
                className={styles['image-container']}
                onClick={() => handleClickImage(index)}
              >
                <Image src={image} alt='image' fill style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}

        {/* 이미지 있고 피드 일시 이미지와 슬라이드 버튼 보여줌 */}
        {contentData.imageUrl.length !== 0 && isFeed && (
          <div className={styles['slider-button-container']}>
            <button type='button' onClick={handleSlideLeft} className={styles['image-slider-left-button']}>
              <Image src={arrowLeft} alt='arrow-left' />
            </button>
            <button type='button' onClick={handleSlideRight} className={styles['image-slider-right-button']}>
              <Image src={arrowRight} alt='arrow-right' />
            </button>
          </div>
        )}

        <div className={styles['time-and-city']}>
          <p className={styles['time-ago']}>{calculateTimePastSinceItCreated(contentData.createdDate)}</p>
          <p className={styles.city}>{contentData.address || `${contentData.country} ${contentData.city}`}</p>
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
      <CommentBox isFeed={isFeed} postId={contentData.postId} />
    </section>
  );
}
