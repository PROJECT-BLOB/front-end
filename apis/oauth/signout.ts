import instance from '@apis/axios';

export default async function signout() {
  const { data, status } = await instance.get(`/oauth/logout`);

  return { data, status };
}
