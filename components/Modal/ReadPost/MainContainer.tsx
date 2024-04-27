import Image from 'next/image';

import bookmark from '@public/icons/bookmark.svg';
import checkHeart from '@public/icons/check-heart default 24.svg';
import verifiedIcon from '@public/icons/check-verified-02.svg';
import dotsHorizontal from '@public/icons/dots-horizontal.svg';

import CategoryBox from '@components/CategoryBox';
import Kebab from '@components/Kebab';

import CommentBox from './CommentBox';
import useReadPost from './hooks/useReadPost';
import styles from './MainContainer.module.scss';
import ProfileContainer from './ProfileContainer';
import { ReadPostData } from './ReadPost';

interface MainContentProps {
  contentData: ReadPostData;
}

export default function MainContainer({ contentData }: MainContentProps) {
  const { isKebabClicked, toggleKebab } = useReadPost();

  return (
    <section className={styles['main-container']}>
      <div className={styles['delete-container']}>
        <Image src={checkHeart} alt='좋아요 아이콘' />
        <span className={styles['delete-mention']}>이 글은 21시간 38분 31초 이후 삭제됩니다.</span>
      </div>
      <div className={styles['profile-kebab-wrapper']}>
        <ProfileContainer author={contentData.author} />
        <button type='button' className={styles['kebab-wrapper']}>
          <button type='button' onClick={toggleKebab}>
            <Image src={dotsHorizontal} alt='kebab-icon' />
          </button>
          {isKebabClicked && <Kebab isUser={false} />}
        </button>
      </div>
      <div className={styles.distance}>
        <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
        <strong>{contentData.distFromActual}m 이내 작성됨</strong>
      </div>
      <p className={styles.city}>
        {contentData.country} {contentData.city}
      </p>
      <div className={styles['category-bookmark-wrapper']}>
        <CategoryBox contentData={contentData} />
        <button type='button'>
          <Image src={bookmark} alt='북마크 아이콘' />
        </button>
        {/* 북마크 누르는 이벤트 연결해줘야 함 북마크 사용자 식별 해야함 */}
      </div>
      <h3 className={styles.title}>{contentData.title}</h3>
      <p className={styles.content}>{contentData.content}</p>
      <p className={styles['time-ago']}>3시간 전</p> {/* 시간 구하는 로직 추가 해줘야 함 */}
      <div className={styles['content-info']}>
        <p>조회수 {contentData.views}회</p>
        <p>좋아요 2개</p> {/* 좋아요 수 받아야함, 좋아요 사용자 식별 해야함 */}
        <p>댓글 12개</p> {/* 좋아요 수댓글수 받아야함 */}
      </div>
      <CommentBox />
    </section>
  );
}
