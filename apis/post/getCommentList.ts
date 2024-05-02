import instance from '@apis/axios';

export default async function getCommentList(postId: number) {
  const { data, status } = await instance.get(`/comment/post/${postId}?size=20`);

  return { data, status };
}
