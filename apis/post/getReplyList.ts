import instance from '@apis/axios';

export default async function getReplyList(commentId: number) {
  const { data, status } = await instance.get(`/comment/reply/${commentId}`);

  return { data, status };
}
