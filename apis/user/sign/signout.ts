import instance from '@apis/axios';

export default async function signout(userId: number) {
  const { data } = await instance.delete(`/users/${userId}/signout`);

  return data;
}
