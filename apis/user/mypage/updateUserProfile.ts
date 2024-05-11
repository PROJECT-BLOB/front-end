import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export type UpdateUser = Pick<UserDetail, 'nickname' | 'bio' | 'isPublic'>;

export default async function updateUserProfile(formData: FormData) {
  const { data, status } = await instance.patch<FormData>(`/user`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return { data, status };
}
