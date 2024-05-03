import Image from 'next/image';

import filledImageIndex from '@/public/icons/filled-image-index.svg';
import imageIndex from '@/public/icons/image-index.svg';
import nextButton from '@/public/icons/next-button.svg';
import previousButton from '@/public/icons/previous-button.svg';
import { Post } from '@/types/Post';

import useImageControl from './hooks/useImageControl';
import styles from './ImageContainer.module.scss';

interface ImageContainerProps {
  contentData: Post;
}

export default function ImageContainer({ contentData }: ImageContainerProps) {
  const { handleTouchStart, handleTouchEnd, currentImageIndex, handlePrevImage, handleNextImage } = useImageControl(
    contentData.imageUrl,
  );

  return (
    <section className={styles['image-container']} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Image src={contentData.imageUrl[currentImageIndex]} className={styles.image} alt='이미지' fill />

      <button type='button' className={styles['previous-btn']} onClick={handlePrevImage}>
        <Image src={previousButton} alt='이전 버튼' />
      </button>
      <button type='button' className={styles['next-btn']} onClick={handleNextImage}>
        <Image src={nextButton} alt='다음 버튼' />
      </button>

      <div className={styles['index-wrapper']}>
        {contentData.imageUrl.map((image, index) => (
          <Image
            key={image}
            src={currentImageIndex === index ? filledImageIndex : imageIndex}
            alt='이미지 인덱스 이미지'
          />
        ))}
      </div>
    </section>
  );
}
