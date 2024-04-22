import instance from '@apis/axios';

interface Post {
  postId: number;
  author: number;
  title: string;
  content: string;
  createdAt: string;
}

export default async function getUserPostList(userId: number): Promise<Post[]> {
  const { data } = await instance.get<Post[]>(`/users/${userId}/posts`);

  return data;
}
