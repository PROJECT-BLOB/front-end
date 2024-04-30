import { Post } from '@/types/Post';
import instance from '@apis/axios';

export default async function postBookmark(postId: number): Promise<{ data: Post; status: number }> {
  const { data, status } = await instance.post(`/post/bookmark/${postId}`);

  return { data, status };
}
