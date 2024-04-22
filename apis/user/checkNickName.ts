// // 닉네임 중복 확인 -checkNickname(nickname: string)

import instance from '@apis/axios';

// TODO: 닉네임 중복체크 dto의 타입 확인.
export default async function checkNickname(nickname: string) {
  const result = await instance.get(`/user/checkNickname/${nickname}`);

  return result.data;
}
