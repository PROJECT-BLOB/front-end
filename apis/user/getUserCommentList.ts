import instance from '@apis/axios';

interface Comment {
  commentId: number;
  postId: number;
  responseTo: number; // 대댓글인 경우 부모 댓글의 commentId
  authorId: number;
  authorNickname: string;
  createdAt: string;
}

export default async function getUserCommentList(userId: number): Promise<Comment[]> {
  const { data } = await instance.get<Comment[]>(`/users/${userId}/comments`);

  return data;
}
