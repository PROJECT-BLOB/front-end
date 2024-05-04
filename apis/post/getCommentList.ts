import instance from '@apis/axios';

export interface GetCommentList {
  postId: number;
  page: number;
  size: number;
}

export default async function getCommentList(body: GetCommentList) {
  const { data, status } = await instance.get(`/comment/post/${body.postId}`, {
    params: { page: body.page, size: body.size },
  });

  return { data, status };
}
