import instance from '@apis/axios';

import { PostSummary } from './getUserPostList';

// getUserBookmarkList: 북마크한 글 모음
export default async function getUserBookmarkList(userId: number): Promise<PostSummary[]> {
  const { data } = await instance.get<PostSummary[]>(`/users/${userId}/bookmarks`);

  return data;
}
