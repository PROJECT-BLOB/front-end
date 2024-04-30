import { Post } from '@/types/Post';
import instance from '@apis/axios';

export default async function postLike(postId: number): Promise<{ data: Post; status: number }> {
  const { data, status } = await instance.post(`/post/like/${postId}`);

  return { data, status };
}
