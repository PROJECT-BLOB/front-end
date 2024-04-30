import { Post } from '@/types/Post';
import instance from '@apis/axios';

export type PostSummary = Pick<Post, 'postId' | 'author' | 'title' | 'content'>;

// getUserPostList : 유저가 작성한 글 모음
export default async function getUserPostList(userId: number): Promise<{ data: PostSummary[]; status: number }> {
  const { data, status } = await instance.get<PostSummary[]>(`/users/${userId}/posts`);

  return { data, status };
}
