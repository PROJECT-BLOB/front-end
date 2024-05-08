/* eslint-disable object-shorthand */
import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export type UpdateUser = Pick<UserDetail, 'profileUrl' | 'nickName' | 'bio' | 'isPrivate'>;

export default async function updateUserProfile({ profileUrl, nickName, bio, isPrivate }: UpdateUser) {
  const { data, status } = await instance.patch<UpdateUser>(`/user`, {
    profileUrl: profileUrl,
    nickName: nickName,
    bio: bio,
    isPrivate: isPrivate,
  });

  return { data, status };
}
