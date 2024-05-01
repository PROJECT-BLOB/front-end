import instance from '@apis/axios';

export default async function postCommentLike(commentId: number) {
  const { data, status } = await instance.post(`/comment/like/${commentId}`);

  return { data, status };
}
