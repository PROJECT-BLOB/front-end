import instance from '@apis/axios';

export default async function postReportComment(commentId: number) {
  const { data, status } = await instance.post(`/comment/report/${commentId}`);

  return { data, status };
}
