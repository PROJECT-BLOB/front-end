import { Post } from '@/types/Post';
import instance from '@apis/axios';

export default async function getPost(postId: number): Promise<{ data: Post; status: number }> {
  const { data, status } = await instance.get(`/post/${postId}`);

  return { data, status };
}
