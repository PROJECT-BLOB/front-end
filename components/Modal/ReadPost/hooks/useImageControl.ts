import { TouchEventHandler, useState } from 'react';

export default function useImageControl(imageList: string[] = []) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  function handlePrevImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageList.length - 1 : prevIndex - 1));
  }

  function handleNextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex === imageList.length - 1 ? 0 : prevIndex + 1));
  }

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    const touch = event.touches[0];

    if (touch) {
      setTouchStartX(touch.clientX);
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    const touch = event.changedTouches[0];

    if (touch) {
      const touchEndX = touch.clientX;
      const deltaX = touchEndX - touchStartX;
      const threshold = window.innerWidth / 2;

      if (deltaX > threshold) {
        handlePrevImage();
      } else if (deltaX < -threshold) {
        handleNextImage();
      }
    }
  };

  return {
    currentImageIndex,
    handleTouchStart,
    handleTouchEnd,
    handlePrevImage,
    handleNextImage,
  };
}
