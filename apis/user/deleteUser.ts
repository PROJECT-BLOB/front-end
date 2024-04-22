// // ===회원 탈퇴
// // 회원 탈퇴 - deleteUser()

import instance from '@apis/axios';

export default async function deleteUser(userId: number) {
  const result = await instance.delete(`/user/${userId}`);

  return result.data;
}
