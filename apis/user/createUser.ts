import instance from '@apis/axios';

// 유저 아이디,닉네임 생성
export default async function createUser(nickname: string, id: string) {
  const result = await instance.post('/user', {
    nickname,
    id,
  });

  return result.data;
}
