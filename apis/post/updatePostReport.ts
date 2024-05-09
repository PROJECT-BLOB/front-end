import instance from '@apis/axios';

export default async function updatePostReport(postId: number) {
  const { data, status } = await instance.post(`/post/report/${postId}`);

  return { data, status };
}
