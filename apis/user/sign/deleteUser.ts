import instance from '@apis/axios';

export default async function deleteUser() {
  const { data, status } = await instance.delete(`/user`);

  return { data, status };
}
