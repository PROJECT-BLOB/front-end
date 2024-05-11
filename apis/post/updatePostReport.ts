import instance from '@apis/axios';

export default async function updatePostReport(postId: number) {
  try {
    const { data, status } = await instance.post(`/post/report/${postId}`);

    return { data, status };
  } catch (error) {
    console.error(error);
  }
}
