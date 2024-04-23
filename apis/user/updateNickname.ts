import instance from '@apis/axios';

interface UserNickname {
  nickname: string;
}

export default async function updateNickname(userId: number, nickname: string) {
  const { data } = await instance.patch<UserNickname>(`/users/${userId}/nickname`, {
    nickname,
  });

  return data;
}
