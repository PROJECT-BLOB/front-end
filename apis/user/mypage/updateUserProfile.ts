/* eslint-disable object-shorthand */
import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export type UpdateUser = Pick<UserDetail, 'profileUrl' | 'nickname' | 'bio' | 'isPublic'>;

export default async function updateUserProfile({ profileUrl, nickname, bio, isPublic }: UpdateUser) {
  const { data, status } = await instance.patch<UpdateUser>(`/user`, {
    // profileUrl: profileUrl,
    nickname: nickname,
    bio: bio,
    isPublic: isPublic,
  });

  return { data, status };
}
