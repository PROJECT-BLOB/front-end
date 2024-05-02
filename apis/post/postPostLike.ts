import instance from '@apis/axios';

export default async function postPostLike(postId: number) {
  const { data, status } = await instance.post(`/post/like/${postId}`);

  return { data, status };
}
