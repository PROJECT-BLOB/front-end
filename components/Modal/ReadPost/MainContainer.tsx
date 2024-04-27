import Image from 'next/image';

import bookmark from '@public/icons/bookmark.svg';
import checkHeart from '@public/icons/check-heart-pink.svg';
import verifiedIcon from '@public/icons/check-verified-blue.svg';
import filledBookmark from '@public/icons/filled-bookmark.svg';

import CategoryBox from '@components/CategoryBox';

import calculateTimePastSinceItCreated from '@utils/calculateTimePastSinceItCreated';

import CommentBox from './CommentBox';
import styles from './MainContainer.module.scss';
import ProfileContainer from './ProfileContainer';
import { ReadPostData } from './ReadPost';

interface MainContentProps {
  contentData: ReadPostData;
}

export default function MainContainer({ contentData }: MainContentProps) {
  return (
    <section className={styles['main-container']}>
      <div className={styles['delete-container']}>
        <Image src={checkHeart} alt='좋아요 아이콘' width={24} height={24} />
        <span className={styles['delete-mention']}>이 글은 21시간 38분 31초 이후 삭제됩니다.</span>
        {/* 맵에서 사라지는거 받아야 함 */}
      </div>

      <ProfileContainer author={contentData.author} canDelete={contentData.canDelete} />

      <div className={styles.distance}>
        <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
        <strong>{contentData.distFromActual}m 이내 작성됨</strong>
      </div>

      <p className={styles.city}>
        {contentData.country} {contentData.city}
      </p>

      <div className={styles['category-bookmark-wrapper']}>
        <CategoryBox contentData={contentData} />
        {/* 북마크 누르는 이벤트 연결해줘야 함 */}
        <button type='button' onClick={() => {}}>
          <Image src={contentData.bookmarked ? filledBookmark : bookmark} alt='북마크 아이콘' />
        </button>
      </div>

      <h3 className={styles.title}>{contentData.title}</h3>
      <p className={styles.content}>{contentData.content}</p>
      <p className={styles['time-ago']}>{calculateTimePastSinceItCreated(contentData.createdDate)}</p>

      <div className={styles['content-info']}>
        <p>조회수 {contentData.views}회</p>
        <p>좋아요 {contentData.likeCount}개</p> {/* 좋아요 사용자 식별 해야함, 누름 아이콘 추가 필 */}
        <p>댓글 {contentData.commentCount}개</p>
      </div>

      <CommentBox />
    </section>
  );
}
