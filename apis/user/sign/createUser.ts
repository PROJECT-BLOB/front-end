/* eslint-disable object-shorthand */
import instance from '@apis/axios';

interface CreateUserProps {
  nickname: string;
  id: string;
}

// 유저 아이디,닉네임 생성
export default async function createUser({ nickname, id }: CreateUserProps) {
  const { data, status } = await instance.post('/user', {
    blobId: id,
    nickname: nickname,
  });

  return { data, status };
}
