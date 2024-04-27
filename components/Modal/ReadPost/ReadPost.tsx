import Image from 'next/image';

import blovedIcon from '@public/icons/bloved.svg';
import bookmardIcon from '@public/icons/bookmark.svg';
import kebabIcon from '@public/icons/kebab.svg';
import modalClose from '@public/icons/modal-close.svg';
import verifiedIcon from '@public/icons/verified.svg';

import useReadPost from './hooks/useReadPost';
import styles from './ReadPost.module.scss';
import Modal from '../Modal';

export const mockContent = {
  postId: 123456,
  title: '지하철역에서 완전 가까워서 좋아요!!',
  content:
    '가격이 조금 있어서 할까 말까 고민을 했었는데 지하철역이랑 완전 가까워서 시간을 많이 아낄 수 있어서 좋네요. 따뜻한 물도 완전 잘나오고 시설 전체가 깔끔하고 좋습니다. 완전 추천!!',
  category: '알려드려요',
  subcategory: '날씨',
  author: {
    blobId: 'blob',
    nickname: 'blob',
    profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
  },
  country: '대한민국',
  city: '서울',
  lat: 37.5326,
  lng: 127.024612,
  distFromActual: 100,
  views: 500,
  createdDate: '2024-04-24T12:59:24',
  imageUrl: [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtklqiExudT8_ZGBlYXOE612HhAUrNru8cIft_vmORg&s',
    'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
  ],
  liked: false,
  bookmarked: false,
}; // useQuery로 데이터 받아옴

export default function ReadPost() {
  const { currentImageIndex, toggleModal, handleTouchStart, handleTouchEnd, handlePrevImage, handleNextImage } =
    useReadPost();

  return (
    <Modal>
      <Modal.Header>
        <button type='button' onClick={toggleModal} className={styles['close-button']}>
          <Image src={modalClose} alt='close-button' />
        </button>
      </Modal.Header>

      <Modal.Body>
        <div className={styles['image-container']} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Image src={mockContent.imageUrl[currentImageIndex]} className={styles.image} alt='이미지' fill />
          <button type='button' className={styles['prev-btn']} onClick={handlePrevImage}>
            &lt;
          </button>
          <button type='button' className={styles['next-btn']} onClick={handleNextImage}>
            &gt;
          </button>
          <div className={styles['index-wrapper']}>
            {mockContent.imageUrl.map((image, index) => (
              <span key={image} className={`${styles.index} ${currentImageIndex === index ? styles.active : ''}`}>
                o {/* 임시로 이미지 목차 디자인 */}
              </span>
            ))}
          </div>
        </div>
        <div className={styles['delete-container']}>
          <Image src={blovedIcon} alt='좋아요 아이콘' />
          <span className={styles['delete-mention']}>이 글은 21시간 38분 31초 이후 삭제됩니다.</span>
        </div>
        <div className={styles['profile-kebab-wrapper']}>
          <div className={styles['profile-container']}>
            <div className={styles['profile-image-wrapper']}>
              <Image src={mockContent.author.profileUrl} alt='프로필이미지' fill />
            </div>
            <b className={styles['profile-nickname']}>{mockContent.author.nickname}</b>
            <div className={styles['like-container']}>
              <Image src={blovedIcon} alt='좋아요 아이콘' />
              <b className={styles['like-count']}>30</b>
            </div>
          </div>
          <button type='button' className={styles['kebab-wrapper']}>
            <Image src={kebabIcon} alt='kebab-icon' /> {/* 케밥 버튼 구현 해 줘야함 안에 삭제하기 신고하기 */}
          </button>
        </div>
        <div className={styles.distance}>
          <Image src={verifiedIcon} alt='인증마크' width={20} height={20} />
          {mockContent.distFromActual}m 이내 작성됨
        </div>
        <p className={styles.city}>
          {mockContent.country} {mockContent.city}
        </p>
        <div className={styles['category-bookmark-wrapper']}>
          <p className={styles.category}>
            {mockContent.subcategory} {mockContent.category} {/* 카테고리에 따라서 색깔 정해줘야 함 */}
          </p>
          <Image
            src={bookmardIcon}
            alt='북마크 아이콘
          '
          />
          {/* 북마크 누르는 이벤트 연결해줘야 함 북마크 사용자 식별 해야함 */}
        </div>
        <h3 className={styles.title}>{mockContent.title}</h3>
        <p className={styles.content}>{mockContent.content}</p>
        <p className={styles['time-ago']}>3시간 전</p> {/* 시간 구하는 로직 추가 해줘야 함 */}
        <div className={styles['content-info']}>
          <p>조회수 {mockContent.views}회</p>
          <p>좋아요 2개</p> {/* 좋아요 수 받아야함, 좋아요 사용자 식별 해야함 */}
          <p>댓글 12개</p> {/* 좋아요 수댓글수 받아야함 */}
        </div>
        {/* 댓글 컴포넌트 구현해야함 */}
        <form className={styles['comment-form']}>
          <input type='text' className={styles['comment-input']} placeholder='댓글 남기기' />
          <button type='submit' className={styles['comment-submit-button']}>
            게시
          </button>
        </form>
        {/* 댓글 쿼리 연결 해줘야 함 */}
      </Modal.Body>
    </Modal>
  );
}
