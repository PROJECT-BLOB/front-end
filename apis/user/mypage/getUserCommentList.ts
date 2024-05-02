import { Comment } from '@/types/Post';
import instance from '@apis/axios';

export default async function getUserCommentList(userId: number): Promise<{ data: Comment[]; status: number }> {
  const { data, status } = await instance.get<Comment[]>(`/users/${userId}/comments`);

  return { data, status };
}
