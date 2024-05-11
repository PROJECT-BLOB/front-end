import { useState } from 'react';

export default function useKebabState() {
  const [isKebabClicked, setIsKebabClicked] = useState(false);

  function toggleKebab() {
    setIsKebabClicked((prev) => !prev);
  }

  return {
    isKebabClicked,
    toggleKebab,
  };
}
