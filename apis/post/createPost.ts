import { Post } from '@/types/Post';
import instance from '@apis/axios';

export default async function createPost(formData: FormData): Promise<{ data: Post; status: number }> {
  const { data, status } = await instance.post(`/post`, formData);

  return { data, status };
}
