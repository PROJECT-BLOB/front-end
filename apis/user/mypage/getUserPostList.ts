import { Post } from '@/types/Post';
import instance from '@apis/axios';

export interface PostList {
  content: Array<Post>;
  count: number;
  currentPage: number;
  hasMore: boolean;
}

export interface PostListProps {
  userId: number;
  page: number;
  size: number;
  // sort: 'asc' | 'desc';
}

// getUserPostList : 유저가 작성한 글 모음
export default async function getUserPostList(body: PostListProps): Promise<{ data: PostList; status: number }> {
  const { data, status } = await instance.get<PostList>(`/user/${body.userId}/post`, {
    params: { page: body.page, size: body.size },
  });

  return { data, status };
}
