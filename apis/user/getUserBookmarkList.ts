import instance from '@apis/axios';

// 재사용됨-나중에 파일 분리
interface Post {
  postId: number;
  author: number;
  title: string;
  content: string;
  createdAt: string;
}

export default async function getUserBookmarkList(userId: number): Promise<Post[]> {
  const { data } = await instance.get<Post[]>(`/users/${userId}/bookmarks`);

  return data;
}
