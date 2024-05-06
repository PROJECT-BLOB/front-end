import instance from '@apis/axios';

import { PostList, PostListProps } from './getUserPostList';

// getUserBookmarkList: 북마크한 글 모음
export default async function getUserBookmarkList(body: PostListProps): Promise<{ data: PostList; status: number }> {
  const { data, status } = await instance.get<PostList>(`/user/${body.userId}/bookmark`, {
    params: { page: body.page, size: body.size },
  });
  console.log('북마크글 가져옵니다');

  return { data, status };
}
