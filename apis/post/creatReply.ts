import instance from '@apis/axios';

interface PostReply {
  commentId: number;
  body: { content: string };
}

export default async function createReply({ commentId, body }: PostReply) {
  const { data, status } = await instance.post(`/comment/reply/${commentId}`, body);

  return { data, status };
}
