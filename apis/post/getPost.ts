import instance from '@apis/axios';

export default async function getPost(postId: number) {
  const { data, status } = await instance.get(`/post/${postId}`);

  return { data, status };
}
