import { POSTS_PAGE_LIMIT } from '@constants/pageValues';

const BASE_URL = 'https://learn.codeit.kr/api/codestudit';

// TODO 무한 스크롤 테스트 임시 코드잇 api. 백엔드 api 완성되면 삭제 예정
export default async function getPosts(page = 0, limit = POSTS_PAGE_LIMIT) {
  const response = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`);

  return await response.json();
}
