import instance from '@apis/axios';

export interface Post {
  postId: number;
  authorId: number;
  authorNickname: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
}

export type PostSummary = Pick<Post, 'postId' | 'authorId' | 'authorNickname' | 'title' | 'content' | 'createdAt'>;

// getUserPostList : 유저가 작성한 글 모음
export default async function getUserPostList(userId: number): Promise<PostSummary[]> {
  const { data } = await instance.get<PostSummary[]>(`/users/${userId}/posts`);

  return data;
}
