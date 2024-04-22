import instance from '@apis/axios';

// 회원 탈퇴
export default async function createUser(nickname: string, id: string) {
  const result = await instance.post('/user', {
    nickname,
    id,
  });

  return result.data;
}
