import instance from '@apis/axios';

export interface GetCommentListProps {
  postId: number;
  page: number;
  size: number;
}

export default async function getCommentList(body: GetCommentListProps) {
  const { postId, page, size } = body;

  const { data, status } = await instance.get(`/comment/post/${postId}`, {
    params: { page, size },
  });

  return { data, status };
}
