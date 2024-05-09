/* eslint-disable object-shorthand */
import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export type UpdateUser = Pick<UserDetail, 'profileUrl' | 'nickname' | 'bio' | 'isPublic'>;

export default async function updateUserProfile(formData: any) {
  const { data, status } = await instance.patch<any>(`/user`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { data, status };
}
