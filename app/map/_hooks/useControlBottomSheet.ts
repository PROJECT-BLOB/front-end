import { useState } from 'react';

const HEADER_HEIGHT = 73.5;

export default function useControlBottomSheet() {
  const startY = 0;
  let windowHeight = 650;

  if (typeof window !== 'undefined') windowHeight = window.innerHeight;

  // 컨테이너 높이
  const [offsetY, setOffsetY] = useState(windowHeight - HEADER_HEIGHT);

  //   타입 찾자
  const handleTouchMove = (event: any) => {
    // 화면 높이
    const windowHeight = window.innerHeight;
    // 현재 터치 위치
    const currentY = event.touches[0].clientY;
    // 시작위치 - 현재 위치
    const deltaY = currentY - startY;

    if (deltaY > 75 && deltaY < windowHeight - 75) {
      setOffsetY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    const percentage = (Math.abs(offsetY) / windowHeight) * 100;
    let newOffsetY;

    // 최대가 10퍼
    // 25퍼 분기점
    // 40퍼
    // 65퍼 분기점
    // 90퍼
    if (percentage <= 25) {
      newOffsetY = HEADER_HEIGHT; // 최대
    } else if (percentage >= 65) {
      newOffsetY = windowHeight - HEADER_HEIGHT; // 최소
    } else {
      newOffsetY = windowHeight * 0.4;
    }

    setOffsetY(newOffsetY);
  };

  function handleClickClose() {
    setOffsetY(window.innerHeight - HEADER_HEIGHT);
  }

  // 헤더 버튼 클릭시 위치에 따라 펼쳐짐 정도 다르게 해줌
  function handleClickSheet() {
    if (offsetY === windowHeight - HEADER_HEIGHT) setOffsetY(windowHeight * 0.4);

    if (offsetY === windowHeight * 0.4) setOffsetY(HEADER_HEIGHT);
  }

  // 컨테이너 높이에 따라 css에 위치 적용
  const sheetStyle = {
    transform: `translateY(calc(${offsetY}px))`,
  };

  return { handleTouchMove, handleTouchEnd, handleClickClose, sheetStyle, handleClickSheet };
}
