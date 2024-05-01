import instance from '@apis/axios';

export default async function createReply(commentId: number, body: { content: string }) {
  const { data, status } = await instance.post(`/comment/reply/${commentId}`, body);

  return { data, status };
}
