import instance from '@apis/axios';

export interface PostComment {
  postId: number;
  body: { content: string };
}

export default async function createComment({ postId, body }: PostComment) {
  const { data, status } = await instance.post(`/comment/post/${postId}`, body);

  return { data, status };
}
