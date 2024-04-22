import instance from '@apis/axios';

interface Comment {
  commentId: number;
  postId: number;
  author: number;
  createdAt: string;
}

export default async function getUserCommentList(userId: number): Promise<Comment[]> {
  const { data } = await instance.get<Comment[]>(`/users/${userId}/comments`);

  return data;
}
