import instance from '@apis/axios';

interface CreateReplyProps {
  commentId: number;
  body: { content: string };
}

export default async function createReply({ commentId, body }: CreateReplyProps) {
  const { data, status } = await instance.post(`/comment/reply/${commentId}`, body);

  return { data, status };
}
