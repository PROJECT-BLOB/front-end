import instance from '@apis/axios';

export default async function createComment(postId: number, body: { content: string }) {
  const { data, status } = await instance.post(`/comment/post/${postId}`, body);

  return { data, status };
}
