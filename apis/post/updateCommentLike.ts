import instance from '@apis/axios';

export default async function updateCommentLike(commentId: number) {
  const { data, status } = await instance.post(`/comment/like/${commentId}`);

  return { data, status };
}
