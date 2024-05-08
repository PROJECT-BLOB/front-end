/* eslint-disable object-shorthand */
import instance from '@apis/axios';

interface CreateUserProps {
  // TODO nickname으로 통일하는게 좋지 않을까..
  nickName: string;
  id: string;
}

// 유저 아이디,닉네임 생성
export default async function createUser({ nickName, id }: CreateUserProps) {
  const { data, status } = await instance.post('/user', {
    blobId: id,
    nickName: nickName,
  });

  return { data, status };
}
