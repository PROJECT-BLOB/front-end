import instance from '@apis/axios';

export default async function deletePost(postId: number) {
  const { data, status } = await instance.delete(`/post/${postId}`);

  return { data, status };
}
