'use client';

import { useState } from 'react';

import useDebounce from '@hooks/useDebounce';

// debounce 사용 예시를 위해 임시로 만들었습니다.
export default function SearchBar() {
  const [keyword, setKeyword] = useState<string>('');
  const debouncedValue = useDebounce(keyword, 300);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
      <div>{debouncedValue}</div>
    </>
  );
}
