import instance from '@apis/axios';

export default async function deleteComment(commentId: number) {
  const { data, status } = await instance.delete(`/comment/${commentId}`);
  // eslint-disable-next-line no-alert
  alert(data);

  return { data, status };
}
