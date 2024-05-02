/* eslint-disable object-shorthand */
import instance from '@apis/axios';

interface CreateUserProps {
  oauthId: string | null;
  nickname: string;
  id: string;
}

// 유저 아이디,닉네임 생성
export default async function createUser({ oauthId, nickname, id }: CreateUserProps) {
  const { data, status } = await instance.post('/user', {
    oauthId: oauthId,
    blobId: id,
    nickName: nickname,
  });

  return { data, status };
}
