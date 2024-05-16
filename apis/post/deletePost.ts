import instance from '@apis/axios';

export default async function deletePost(postId: number) {
  const { data, status } = await instance.delete(`/post/${postId}`);
  // eslint-disable-next-line no-alert
  alert(data);

  return { data, status };
}
