import { UserDetail } from '@/types/User';
import instance from '@apis/axios';

export default async function getUserDetail(userId: number): Promise<{ data: UserDetail; status: number }> {
  const { data, status } = await instance.get<UserDetail>(`/user/${userId}`);

  return { data, status };
}
