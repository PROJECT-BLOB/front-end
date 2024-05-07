import instance from '@apis/axios';

export default async function updateReportPost(postId: number) {
  const { data, status } = await instance.post(`/post/report/${postId}`);

  return { data, status };
}
