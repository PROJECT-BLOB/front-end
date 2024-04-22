import instance from '@apis/axios';

// TODO:  dto의 타입 확인.
export default async function updateBio(userId: number) {
  const result = await instance.patch(`/user/${userId}/bio`);

  return result.data;
}
