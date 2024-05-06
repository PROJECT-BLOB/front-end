// // 닉네임 중복 확인 -checkNickname(nickname: string)

import instance from '@apis/axios';

// TODO: dto의 타입 확인.
export default async function checkBlobId(blobId: string) {
  const { data, status } = await instance.get(`/user/checkBlobId/${blobId}`);

  return { data, status };
}
