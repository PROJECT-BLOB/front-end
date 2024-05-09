import instance from '@apis/axios';

interface GetReplyListProps {
  commentId: number;
  size: number;
  page: number;
}

export default async function getReplyList(body: GetReplyListProps) {
  const { commentId, size, page } = body;

  const { data, status } = await instance.get(`/comment/reply/${commentId}`, { params: { size, page } });

  return { data, status };
}
