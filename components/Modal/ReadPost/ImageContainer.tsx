import Image from 'next/image';

import { Post } from '@/types/Post';

import useReadPost from './hooks/useReadPost';
import styles from './ImageContainer.module.scss';

interface ImageContainerProps {
  contentData: Post;
}

export default function ImageContainer({ contentData }: ImageContainerProps) {
  const { handleTouchStart, handleTouchEnd, currentImageIndex, handlePrevImage, handleNextImage } = useReadPost(
    contentData.imageUrl,
  );

  return (
    <section className={styles['image-container']} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Image src={contentData.imageUrl[currentImageIndex]} className={styles.image} alt='이미지' fill />

      <button type='button' className={styles['previous-btn']} onClick={handlePrevImage}>
        &lt;
      </button>
      <button type='button' className={styles['next-btn']} onClick={handleNextImage}>
        &gt;
      </button>

      <div className={styles['index-wrapper']}>
        {contentData.imageUrl.map((image, index) => (
          <span key={image} className={`${styles.index} ${currentImageIndex === index ? styles.active : ''}`}>
            o {/* 임시로 이미지 목차 디자인 */}
          </span>
        ))}
      </div>
    </section>
  );
}
