import instance from '@apis/axios';

export default async function deleteProfileImage() {
  const { data } = await instance.delete(`/user/profilePic`);

  return data;
}
