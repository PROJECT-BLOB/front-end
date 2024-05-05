import instance from '@apis/axios';

import { PostList } from './getUserPostList';

// getUserBookmarkList: 북마크한 글 모음
export default async function getUserBookmarkList(userId: number): Promise<{ data: PostList; status: number }> {
  const { data, status } = await instance.get<PostList>(`/users/${userId}/bookmarks`);

  return { data, status };
}
