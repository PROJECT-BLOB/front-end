import instance from '@apis/axios';

export default async function getPostList() {
  const { data, status } = await instance.get(`/post/`);

  return { data, status };
}
