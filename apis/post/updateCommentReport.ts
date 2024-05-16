/* eslint-disable no-alert */
import instance from '@apis/axios';

export default async function updateCommentReport(commentId: number) {
  const { data, status } = await instance.post(`/comment/report/${commentId}`);
  alert(data);

  return { data, status };
}
