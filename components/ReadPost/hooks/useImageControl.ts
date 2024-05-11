import { TouchEventHandler, useState } from 'react';

export default function useImageControl(imageList: string[] = []) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  function handlePreviousImage() {
    setCurrentImageIndex((previousIndex) => (previousIndex === 0 ? imageList.length - 1 : previousIndex - 1));
  }

  function handleNextImage() {
    setCurrentImageIndex((previousIndex) => (previousIndex === imageList.length - 1 ? 0 : previousIndex + 1));
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
        handlePreviousImage();
      } else if (deltaX < -threshold) {
        handleNextImage();
      }
    }
  };

  return {
    currentImageIndex,
    handleTouchStart,
    handleTouchEnd,
    handlePreviousImage,
    handleNextImage,
    setCurrentImageIndex,
  };
}
