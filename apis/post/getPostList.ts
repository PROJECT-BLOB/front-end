import { Post } from '@/types/Post';
import instance from '@apis/axios';

export default async function getPostList(): Promise<{ data: Post[]; status: number }> {
  const { data, status } = await instance.get(`/post/`);

  return { data, status };
}
